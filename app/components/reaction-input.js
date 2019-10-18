import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import moment from 'moment';

export default class ReactionInputComponent extends Component {
  @tracked currentQuery;

  @action
  setCurrentQuery(e) {
    this.currentQuery = e.target.value;
  }

  @action
  setCurrentQueryByOption(e) {
    if (e.metaKey && e.key !== 'Meta') {
      let option = parseInt(e.key);
      let match = this.matches[option - 1];
      if (match) {
        this.currentQuery = match.shortname;
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
    if (this.args.onSet) {
      this.args.onSet(this.currentQuery);
    }
    this.currentQuery = '';
    document.getElementById('current-query').value = '';
  }

  @action setMatches(value) {
    this.matches = value;
  }

  @tracked shotClock = 5000;

  @tracked startedAt;

  @task({ restartable: true }) *countdownTask() {
    this.startedAt = new Date();
    while (this.shotClock - moment().diff(this.startedAt) > 0) {
      yield timeout(10);
    }
    if (this.args.onSet) {
      this.args.onSet(this.currentQuery);
    }
  }
}