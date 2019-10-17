import { Model, attr, hasMany } from 'ember-orbit';

export default class Reactor extends Model {
  @attr('string') name;

  @hasMany('reactionSet', { inverse: 'reactor' }) reactionSets;
}
