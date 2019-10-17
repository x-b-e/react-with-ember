import { Model, hasOne } from 'ember-orbit';

export default class Reaction extends Model {
  @hasOne('reactionSet', { inverse: 'reactions' }) reactionSet;

  @hasOne('prompt', { inverse: 'reactions' }) prompt;
}
