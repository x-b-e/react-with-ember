import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class GamesNewController extends Controller {
  @action
  setReactionAndGoToNext(value) {
    this.model.currentReaction.value = value;
    this.model.goToNextReaction();
  }
}
