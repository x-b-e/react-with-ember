import Service from '@ember/service';
import EmojiShort from 'emoji-shortname-to-image';

export default class EmojiService extends Service {
  emoji = new EmojiShort();

  get shortnames() {
    return this.emoji.shortnames;
  }

  toUnicode() {
    return this.emoji.toUnicode(...arguments);
  }
}
