import Controller from '@ember/controller';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import moment from 'moment';

export default class GamesNewController extends Controller {
  *moveTransition({ keptSprites, receivedSprites }) {
    for (let kept of keptSprites) {
      yield move(kept);
    }
    for (let sprite of receivedSprites) {
      yield move(sprite);
    }
  }

  @action
  setReactionAndGoToNext(value) {
    this.model.currentReaction.value = value;
    this.model.currentReaction.updatedAt = moment().toDate();
    this.model.goToNextReaction();
  }
}
