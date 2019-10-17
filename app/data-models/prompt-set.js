import { Model, attr, hasMany } from 'ember-orbit';

export default class PromptSet extends Model {
  @attr('string') name

  @hasMany('prompt', { inverse: 'promptSet' }) prompts;

  @hasMany('reactionSet', { inverse: 'promptSet' }) reactionSets;
}
