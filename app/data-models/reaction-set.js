import { Model, hasOne, hasMany } from 'ember-orbit';
import { computed } from '@ember/object';

export default class ReactionSet extends Model {
  @hasOne('promptSet', { inverse: 'reactionSets' }) promptSet;

  @hasMany('reaction', { inverse: 'reactionSet' }) reactions;

  @computed('reactions.[]')
  get currentReaction() {
    return this.reactions.firstObject;
  }
}
