import Controller from '@ember/controller';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import moment from 'moment';

export default class GamesNewController extends Controller {
  transition = move;

  * moveTransition({ keptSprites, sentSprites, receivedSprites }) {
    keptSprites.forEach(move)
    sentSprites.forEach(move);
    receivedSprites.forEach(move);
  }

  @action
  setReactionAndGoToNext() {
    this.model.currentReaction.value = this.currentQuery;
    this.model.currentReaction.updatedAt = moment().toDate();
    this.model.goToNextReaction();
  }
}
