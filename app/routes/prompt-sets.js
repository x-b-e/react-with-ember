import Route from '@ember/routing/route';

export default class PromptSetsRoute extends Route {
  async model() {
    return this.store.liveQuery(function(qb) {
      return qb.findRecords('promptSet');
    });
  }
}
