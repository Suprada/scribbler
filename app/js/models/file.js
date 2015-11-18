define(function() {
  var File = Backbone.Model.extend({
    url: 'file',
    defaults: {title: '', notes: ''}
  });
  return File;
});

/*
define(function() {
  var Scribble = Backbone.Model.extend({
    url: 'scribble'
  });
  return Scribble;
})
*/
