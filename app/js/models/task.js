define(function() {
  var Task = Backbone.Model.extend({
    url: 'tasks',
    defaults: {title: '', notes: ''}
  });
  return Task;
});


/*
define(function() {
  var Scribble = Backbone.Model.extend({
    url: 'scribble'
  });
  return Scribble;
})
*/
