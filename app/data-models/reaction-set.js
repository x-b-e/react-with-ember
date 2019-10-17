import { Model, hasOne, hasMany } from 'ember-orbit';
import { tracked } from '@glimmer/tracking';

export default class ReactionSet extends Model {
  @hasOne('promptSet', { inverse: 'reactionSets' }) promptSet;

  @hasMany('reaction', { inverse: 'reactionSet' }) reactions;

  @tracked currentReaction;

  goToNextReaction() {
    console.log('goToNextReaction');
    let index = this.reactions.content.indexOf(this.currentReaction);
    console.log(index);
    this.currentReaction =  this.reactions.content[index + 1];
  }
}
