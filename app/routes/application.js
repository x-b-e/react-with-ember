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
        maxSeconds: 5,
        prompts: [
          'motherhood',
          'business',
          'Messi',
          'fest',
          'pager',
        ],
      },
      {
        name: 'Round 2',
        maxSeconds: 5,
        prompts: [
          'Ember',
          'ember-animated',
          'works on my machine',
          'ember-concurrency',
          'splattributes',
        ],
      },
      {
        name: 'Round 3',
        maxSeconds: 5,
        prompts: [
          'bug fixed (+70,0000,-0)',
          'orbit.js',
          'mixins',
          '"once and for all"',
          'hooks',
        ],
      },
      {
        name: 'Round 4',
        maxSeconds: 10,
        prompts: [
          'Yehuda',
          'Tom',
          'Ed',
          '@barelyknown',
          '@milindalvares',
        ]
      }
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
          maxSeconds: datum.maxSeconds,
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
