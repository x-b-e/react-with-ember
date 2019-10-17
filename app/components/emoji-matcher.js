import Component from '@glimmer/component';
import EmojiShort from 'emoji-shortname-to-image';

// <EmojiMatcher @query="wav" @limit={{3}} as |matches|>
//     <div class="flex text-xl text-center">
//     {{#each matches as |match|}}
//       <div class="flex-1">
//         <div>{{match.unicode}}</div>
//         <div>{{match.shortname}}</div>
//       </div>
//     {{/each}}
//   </div>
// </EmojiMatcher>

export default class EmojiMatcherComponent extends Component {
  get limit() {
    return this.args.limit || 5;
  }

  get matches() {
    let { args: { query } } = this;
    let emoji = new EmojiShort();

    let pattern = new RegExp(`:(${query}.*?):`, 'g');
    let result = pattern.exec(emoji.shortnames);
    let matches = [];
    while (result != null && matches.length < this.limit) {
      matches.push(result[0]);
      result = pattern.exec(emoji.shortnames);
    }
    return matches.map(function(match) {
      return {
        shortname: match.replace(/:/g, ''),
        unicode: emoji.toUnicode(match)
      }
    });
  }
}