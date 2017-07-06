import Ember from 'ember';

export default Ember.Component.extend({
 
  classNameBindings: ["done",],

  done: Ember.computed('task.done', function() {
    if (this.get('task.done')) {
      return "done";
    }
    return "";
  }),

  actions: {
    toggleDone() {
      this.set('task.done', !this.get('task.done'));
      this.get('task').save();
    }
  }
});
