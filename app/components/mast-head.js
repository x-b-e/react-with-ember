import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';

export default class MastHead extends Component {
  @tracked isAlt

  constructor() {
    super(...arguments);
    this.flickerLights.perform();
  }

  @task
  *flickerLights() {
    this.isAlt = true;
    yield timeout(500);
    yield this.isAlt = false;
    yield timeout(500);
    yield this.flickerLights.perform();
  }
}
