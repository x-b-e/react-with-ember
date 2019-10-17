import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

// <Emoji @shortname="wave" />

export default class EmojiComponent extends Component {
  @service emoji;

  get unicode() {
    let shortnameWithColons = `:${this.args.shortname}:`
    let unicode = this.emoji.toUnicode(shortnameWithColons);
    if (unicode === shortnameWithColons) {
      return this.emoji.toUnicode(':question:');
    } else {
      return unicode;
    }
  }
}