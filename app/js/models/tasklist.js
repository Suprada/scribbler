define(function(){
  var TaskList = Backbone.Model.extend({
    url: 'tasklists'
  });
  return TaskList;
});

/*
// TODO: is this the same as a book?
define (function(){
  var ScribbleList = Backbone.Model.extend({
    url: 'scribblelist'
  });
  return ScribbleList;
});
*/
