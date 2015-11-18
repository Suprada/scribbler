define(['config'], function(config) {
  var app;
  function ApiManager(_app) {
    app = _app;
    this.loadGapi();
  }
  _.extend(ApiManager.prototype, Backbone.Events);
  ApiManager.prototype.init = function() {
    var self = this;
    // *** For Tasks API
    gapi.client.load('tasks', 'v1', function() { /* Loaded */ });

    // *** For Drive API
    // gapi.client.load('drive','v2',function() { /*Loaded */ });

    function handleClientLoad() {
      gapi.client.setApiKey(config.apiKey);
      // wait for a really long time for super crazy slow connections
      window.setTimeout(checkAuth, 10000);
    }
    /**
      * Check if current user has authorized this application.
      */
    function checkAuth() {
      gapi.auth.authorize({ client_id: config.clientId, scope: config.scopes, immediate: true }, handleAuthResult);
    }
    /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
    function handleAuthResult(authResult) {
      var authTimeout;
      if (authResult && !authResult.error) {
        // Schedule a check when the authentication token expires
        if (authResult.expires_in) {
          authTimeout = (authResult.expires_in - 5 * 60) * 1000;
          setTimeout(checkAuth, authTimeout);
        }
        app.views.auth.$el.hide();
        $('#signed-in-container').show();
        self.trigger('ready');
      } else {
        if (authResult && authResult.error) {
          // TODO: Show error
          console.error('Unable to sign in:', authResult.error);
        }
        app.views.auth.$el.show();
      }
    }

    this.checkAuth = function() {
      gapi.auth.authorize({ client_id: config.clientId, scope: config.scopes, immediate: false }, handleAuthResult);
    };
    handleClientLoad();
  };

  ApiManager.prototype.loadGapi = function() {
    var self = this;
    // Don't load gapi if it's already present
    if (typeof gapi !== 'undefined') {
      return this.init();
    }
    require(['https://apis.google.com/js/client.js?onload=define'], function() {
      // Poll until gapi is ready
      function checkGAPI() {
        if (gapi && gapi.client) {
          self.init();
        } else {
          setTimeout(checkGAPI, 100);
        }
      }
      checkGAPI();
    });
  };

  Backbone.sync = function(method, model, options){
    var request
    options || (options = {});

    switch (method) {
      case 'create':
      break;

      case 'update':
      break;

      case 'delete':
      break;

      case 'read':
        // *** For Tasks API
        request = gapi.client.tasks[model.url].list(options.data);

        // *** For Drive API
        //request = gapi.client.drive[model.url].list(options.data);
        Backbone.gapiRequest(request, method, model, options);

        break;
    }
  };

  Backbone.gapiRequest = function(request, method, model, options){
    var result;
    request.execute(function(res){
      if (res.error){
        if (options.error) options.error(res);
      } else if (options.success){
        result = res.items;
        options.success(result, true, request);
      }
    });
  };
  return ApiManager;
})