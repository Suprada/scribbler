define(['models/file'], function(File) {
  var Files = Backbone.Collection.extend({
    model: File
  , url: 'files'
  });

  return Files;
});
