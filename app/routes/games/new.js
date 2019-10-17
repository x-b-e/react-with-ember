import Route from '@ember/routing/route';

export default class GamesNewRoute extends Route {
  async model() {
    let promptSets = await this.store.query(function(qb) {
      return qb.findRecords('promptSet');
    });
    let promptSet = promptSets[Math.floor(Math.random() * promptSets.length)];
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
    return reactionSet;
  }
}
