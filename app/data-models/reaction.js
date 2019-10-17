import { Model, hasOne, attr } from 'ember-orbit';

export default class Reaction extends Model {
  @hasOne('reactionSet', { inverse: 'reactions' }) reactionSet;

  @hasOne('reactor', { inverse: 'reactionSets' }) reactor;

  @attr('string') value;
}
