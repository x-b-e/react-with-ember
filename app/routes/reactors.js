import Route from '@ember/routing/route';

export default class ReactorsRoute extends Route {
  async model() {
    return await this.store.liveQuery(function(qb) {
      return qb.findRecords('reactor');
    });
  }
}
