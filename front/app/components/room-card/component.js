import Ember from 'ember';

export default Ember.Component.extend({
  
  store: Ember.inject.service(),

  tasks: Ember.computed('room', function() {
    const room = this.get('room');
    const date = new Date().toISOString().split('T')[0];
    const instances = this.get('store').query('to-do-list/taskinstance', {task__room: room.get('id'), date});
    return instances;
  }),

  days: Ember.computed(function() {
    const days = this.get('store').findAll('to-do-list/day');
    return days;
  }),

});
