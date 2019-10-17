import Component from '@glimmer/component';
import EmojiShort from 'emoji-shortname-to-image';

// <Emoji @shortname="wave" />

export default class EmojiComponent extends Component {
  get unicode() {
    let es = new EmojiShort();
    let shortnameWithColons = `:${this.args.shortname}:`
    let unicode = es.toUnicode(shortnameWithColons);
    if (unicode === shortnameWithColons) {
      return es.toUnicode(':question:');
    } else {
      return unicode;
    }
  }
}