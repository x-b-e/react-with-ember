import { Model, hasOne, hasMany } from 'ember-orbit';

export default class ReactionSet extends Model {
  @hasOne('promptSet', { inverse: 'reactionSets' }) promptSet;

  @hasMany('reaction', { inverse: 'reactionSet' }) reactions;
}
