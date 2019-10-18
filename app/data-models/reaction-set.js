import { Model, hasOne, hasMany } from 'ember-orbit';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ReactionSet extends Model {
  @service router;

  @hasOne('promptSet', { inverse: 'reactionSets' }) promptSet;

  @hasMany('reaction', { inverse: 'reactionSet' }) reactions;

  @tracked currentReaction;

  goToNextReaction() {
    if (this.currentReaction) {
      let index = this.reactions.content.indexOf(this.currentReaction);
      if (index < this.reactions.content.length - 1) {
        this.currentReaction =  this.reactions.content[index + 1];
      } else {
        this.currentReaction = null;
        this.router.transitionTo('games.show', this.id);
      }
    } else {
      this.currentReaction = this.reactions.firstObject;
    }
  }
}
