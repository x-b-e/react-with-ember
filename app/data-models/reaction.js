import { Model, attr, hasOne } from 'ember-orbit';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Reaction extends Model {
  @service emoji;

  @attr('string') value;

  @attr('string') updatedAt;

  @hasOne('reactionSet', { inverse: 'reactions' }) reactionSet;

  @hasOne('prompt', { inverse: 'reactions' }) prompt;

  @computed('value')
  get isReacted() {
    return isPresent(this.value)
  }

  @computed('emoji', 'value')
  get emojiUnicode() {
    let pattern = new RegExp(`:(${this.value}.*?):`, 'g');
    let result = pattern.exec(this.emoji.shortnames);

    return this.emoji.toUnicode(result[0])
  }
}
