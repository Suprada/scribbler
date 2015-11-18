define([
    'gapi'
  , 'views/app'
  , 'views/auth'
  , 'collections/tasklists' // *** For Tasks API
  //, 'collections/files' // *** For Drive API
  ],

  function(ApiManager, AppView, AuthView,
   TaskLists // *** For Tasks API
   //Files // *** For Drive API
   ){
    var App = function() {
      this.views.app = new AppView();
      this.views.app.render();
      this.views.auth = new AuthView(this);
      this.views.auth.render();
      this.collections.lists = new TaskLists(); // *** For Tasks API
      //this.collections.files = new Files(); // *** For Drive API
      this.connectGapi();
    };

    App.prototype = {
      views: {},
      collections: {},
      connectGapi: function() {
        var self = this;
        this.apiManager = new ApiManager(this);
        this.apiManager.on('ready', function() {
        //*** For Drive API
        self.collections.lists.fetch({ data: {userId: '@me'}, success: function(res) {
            _.each(res.models, function(model) {
              console.log(model.get('title'));
            });
          }});
        });
        //*** For Drive API
        /*self.collections.files.fetch({ data: {userId: '@me'}, success: function(res) {
            _.each(res.models, function(model) {
              console.log(model.get('title'));
            });
          }});
        }); */
      }
    };
  return App;
})
