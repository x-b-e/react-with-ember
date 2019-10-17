import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service dataCoordinator;

  async beforeModel() {
    const backup = this.dataCoordinator.getSource('backup');
    const transform = await backup.pull(q => q.findRecords());
    await this.store.sync(transform);

    await this.dataCoordinator.activate();
  }

  async afterModel() {
    for (let name of ['Sean', 'Milind']) {
      let existing = this.store.cache.query(function(qb) {
        return qb.findRecords('reactor').filter({
          attribute: 'name',
          value: name,
        });
      });
      if (existing.length === 0) {
        await this.store.addRecord({ type: 'reactor', name });
      }
    }
  }
}
