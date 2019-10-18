import Route from '@ember/routing/route';

export default class GamesNewRoute extends Route {
  async model() {
    let reactionSets = await this.store.query(function(qb) {
      return qb.findRecords('reactionSet');
    });

    let promptSets = await this.store.query(function(qb) {
      return qb.findRecords('promptSet');
    });

    let promptSet;

    let reactedPromptSets = reactionSets.map(function(reactionSet) {
      return reactionSet.promptSet;
    });

    for (let p of promptSets) {
      if (!reactedPromptSets.includes(p)) {
        promptSet = p;
        break;
      }
    }

    if (!promptSet) {
      promptSet = promptSets.firstObject;
    }

    let reactionSet = await this.store.addRecord({
      type: 'reactionSet',
      promptSet,
    });
    for (let prompt of promptSet.prompts) {
      reactionSet.reactions.pushObject(
        await this.store.addRecord({
          type: 'reaction',
          prompt,
        })
      )
    }
    reactionSet.goToNextReaction()
    return reactionSet;
  }
}
