import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
import makeRequest from '../utils/make-request';

export default Base.extend({

  init() {
    const globalConfig = config['ember-simple-auth'] || {};
    this.serverAuthEndpoint = globalConfig.serverAuthEndpoint || '/rest-auth';
  },

  authenticate(credentials) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const data = { username: credentials.identification, password: credentials.password };
      makeRequest(`${this.serverAuthEndpoint}/login/`, data).then((response) => {
        Ember.run(() => {
          resolve(response);
        });
      }, (xhr /*, status, error */) => {
        Ember.run(() => {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      makeRequest(`${this.serverAuthEndpoint}/me/`, null, 'GET').then((/* response */) => {
        window._opbeat && window._opbeat('setUserContext', {
          username: data.username
        });
        resolve(data);
      }, (/* xhr , status, error */) => {
        const offline = this.get('offline');
        if (offline.isUp) {
          reject();
          this.invalidate();
        } else {
          resolve(data);
        }
      });
    });
  },

  invalidate(/* data */) {
    function success(resolve) {
      resolve();
    }
    window._opbeat && window._opbeat('setUserContext', {
      username: ''
    });
    return new Ember.RSVP.Promise((resolve /*, reject */) => {
      makeRequest(`${this.serverAuthEndpoint}/logout/`, {}).then((/* response */) => {
        Ember.run(() => {
          success(resolve);
        });
      }, (/* xhr, status, error */) => {
        Ember.run(() => {
          success(resolve);
        });
      });
    });
  },
});

