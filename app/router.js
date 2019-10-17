import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('results');
  this.route('reactors');
  this.route('games', function() {
    this.route('show');
  })
});
