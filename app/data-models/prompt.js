import { Model, attr, hasOne, hasMany } from 'ember-orbit';

export default class Prompt extends Model {
  @attr('string') value;

  @hasOne('promptSet', { inverse: 'prompts' }) promptSet;

  @hasMany('reaction', { inverse: 'prompt' }) reactions;
}
