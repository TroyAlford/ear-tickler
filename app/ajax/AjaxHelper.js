var Helper = require('../Helper.js');

module.exports = {
  ajax: function(options) {
    options = Helper.extend({
      verb: 'GET',
      success: function() {},
      failure: function() {},
      done: function() {}
    }, options);

    var xhr = new XMLHttpRequest();
    xhr.open(options.verb.toUpperCase(), encodeURI(options.uri || ''));
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

  delete: function(options) {
    options.verb = 'DELETE';
    return this.ajax(options);
  },
  get: function(options) {
    options.verb = 'GET';
    return this.ajax(options);
  },
  head: function(options) {
    options.verb = 'HEAD';
    return this.ajax(options);
  },
  options: function(options) {
    options.verb = 'OPTIONS';
    return this.ajax(options);
  },
  post: function(options) {
    options.verb = 'POST';
    return this.ajax(options);
  },
  put: function(options) {
    options.verb = 'PUT';
    return this.ajax(options);
  }
};