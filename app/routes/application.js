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
    await this.seedReactors();
    await this.seedPromptSets();
  }

  async seedReactors() {
    for (let name of ['Sean', 'Milind']) {
      let existing = await this.store.query(function(qb) {
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

  async seedPromptSets() {
    let data = [
      {
        name: 'Round 1',
        prompts: [
          'Motherhood',
          'Business',
          'Messi',
          'QA',
          'ember-animated',
        ]
      },
      {
        name: 'Round 2',
        prompts: [
          'Foo',
          'Bar',
          'Bax',
          'Bux',
          'Bam',
        ]
      },
    ];

    for (let datum of data) {
      let existing = await this.store.query(function(qb) {
        return qb.findRecords('promptSet').filter({
          attribute: 'name', value: datum.name,
        });
      });
      if (existing.length === 0) {
        let promptSet = await this.store.addRecord({
          type: 'promptSet',
          name: datum.name,
        });
        for (let value of datum.prompts) {
          await this.store.addRecord({
            type: 'prompt',
            promptSet,
            value,
          });
        }
      }
    }
  }
}
