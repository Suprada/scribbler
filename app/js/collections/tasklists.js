define(['models/tasklist'], function(TaskList) {
  var TaskLists = Backbone.Collection.extend({
    model: TaskList
  , url: 'tasklists'
  });

  return TaskLists;
});


/*
TODO: make a collection called 'book' which is a collection of scribbles
*/
