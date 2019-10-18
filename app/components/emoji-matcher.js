import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

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
  @service emoji;

  get limit() {
    return this.args.limit || 5;
  }

  get matches() {
    let { args: { query } } = this;
    let m = [];
    if (query && query.length > 0) {
      let pattern = new RegExp(`:([^|]*?${query}.*?):`, 'g');
      let result = pattern.exec(this.emoji.shortnames);
      while (result != null && m.length < this.limit) {
        m.push(result[0]);
        result = pattern.exec(this.emoji.shortnames);
      }
    }

    let matches = m.map(match => {
      return {
        shortname: match.replace(/:/g, ''),
        unicode: this.emoji.toUnicode(match)
      }
    });

    if (this.args.onMatch) {
      this.args.onMatch(matches);
    }

    return matches;
  }
}
