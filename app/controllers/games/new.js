import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class GamesNewController extends Controller {
  @action
  setCurrentQuery(e) {
    this.set('currentQuery', e.target.value);
  }

  @action
  setCurrentQueryByOption(e) {
    if (e.metaKey && e.key !== 'Meta') {
      let option = parseInt(e.key);
      let match = this.matches[option - 1];
      if (match) {
        this.set('currentQuery', match.shortname);
        document.getElementById('current-query').value = match.shortname;
        this.setReaction();
      }
    }
  }

  @action
  setReactionValueFromEnter(e) {
    if (e.key === 'Enter') {
      this.setReaction();
    }
  }

  @action
  setReaction() {
    this.model.currentReaction.value = this.currentQuery;
    this.set('currentQuery', '');
    document.getElementById('current-query').value = '';
    this.model.goToNextReaction();
  }

  @action setMatches(value) {
    this.set('matches', value);
  }
}
