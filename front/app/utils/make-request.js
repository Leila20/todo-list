import Ember from 'ember';
import fetch from 'ember-network/fetch';
import Cookies from 'ember-cli-js-cookie';

function isSecureUrl(url) {
  const link  = document.createElement('a');
  link.href = url;
  link.href = link.href;
  return link.protocol === 'https:';
}

export default function makeRequest(url, data, method) {
  if (!isSecureUrl(url)) {
    Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
  }
  if (method === undefined) {
    method = 'POST';
  }
  const params = {
    method: method,
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };
  if (method === 'POST') {
    params['body'] = JSON.stringify(data);
  } else if (method === 'GET' && window.$ !== undefined) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      window.$.get(url, (xhr) => {
        resolve(xhr);
      }).fail(() => {
        reject();
      });
    });
  }

  return new Ember.RSVP.Promise((resolve, reject) => {
    fetch(`${url}?format=json`, params).then((response) => {
      if (response.status === 400) {
        response.json().then((json) => {
          reject(json);
        });

      } else if (response.status > 400) {
        reject(response);
      } else {
        resolve(response);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

