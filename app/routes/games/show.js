import Route from '@ember/routing/route';

export default class GamesShowRoute extends Route {
  async model({ id }) {
    return await this.store.find('reactionSet', id);
  }
}
