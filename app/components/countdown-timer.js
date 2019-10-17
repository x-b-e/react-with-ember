import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import moment from 'moment';

export default class CountdownTimer extends Component {
  @tracked timeRemaining;

  constructor() {
    super(...arguments)

    this.startAt = moment().add(10, 'seconds');
    this.updateTime.perform();
  }

  @task
  *updateTime() {
    yield this.timeRemaining = moment(this.startAt).diff();
    if (this.timeRemaining > 0) {
      yield timeout(1000);
      yield this.updateTime.perform();
    } else {
      // this.onCountdownEnd();
    }
  }
}
