var _ = require('lodash');

module.exports = window.XHR = {
  ajax: function(url, options) {
    options = _.extend({
      verb: 'GET',
      success: function() {},
      failure: function() {},
      done: function() {}
    }, options);

    var xhr = new XMLHttpRequest();
    xhr.open(options.verb.toUpperCase(), encodeURI(url || ''));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      var response = {
        status: xhr.status,
        message: xhr.responseText
      };

      if (xhr.status === 200)
        options.success(response);
      else
        options.failure(response);

      options.done(response);
    };
    xhr.send(JSON.stringify(options.data || {}));
  },

  delete: function(url, options) {
    return this.ajax(url, _.extend({
      verb: 'DELETE'
    }, options));
  },
  get: function(url, options) {
    return this.ajax(url, _.extend({
      verb: 'GET'
    }, options));
  },
  head: function(url, options) {
    return this.ajax(url, _.extend({
      verb: 'HEAD'
    }, options));
  },
  options: function(url, options) {
    return this.ajax(url, _.extend({
      verb: 'OPTIONS'
    }, options));
  },
  post: function(url, options) {
    return this.ajax(url, _.extend({
      verb: 'POST'
    }, options));
  },
  put: function(url, options) {
    return this.ajax(url, _.extend({
      verb: 'PUT'
    }, options));
  }
};