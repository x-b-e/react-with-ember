import { Model, hasOne, hasMany } from 'ember-orbit';
import { tracked } from '@glimmer/tracking';

export default class ReactionSet extends Model {
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
      }
    } else {
      this.currentReaction = this.reactions.firstObject;
    }
  }
}
