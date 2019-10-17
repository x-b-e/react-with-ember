import { Model, attr, hasOne } from 'ember-orbit';

export default class Prompt extends Model {
  @attr('string') value;

  @hasOne('promptSet', { inverse: 'prompts' }) promptSet;
}
