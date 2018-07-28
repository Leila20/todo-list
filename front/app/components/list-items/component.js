import Ember from 'ember';

export default Ember.Component.extend({
  
  classNameBindings: ["done",],

  done: Ember.computed('item.done', function() {
    if (this.get('item.done')) {
      return "done";
    }
    return "";
  }),

  actions: {
    toggleDone() {
      this.set('item.done', !this.get('item.done'));
      this.get('item').save();
    },
  }
});
