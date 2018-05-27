import Ember from 'ember';

export default Ember.Component.extend({
  
  store: Ember.inject.service(),

  tasks: Ember.computed('room', 'updated', function() {
    const room = this.get('room');
    const date = new Date().toISOString().split('T')[0];
    const instances = this.get('store').query('to-do-list/taskinstance', {task__room: room.get('id'), date});
    return instances;
  }),

  days: Ember.computed(function() {
    const days = this.get('store').findAll('to-do-list/day');
    return days;
  }),


  actions: {
    save(description, frequency) {
      const template = this.get('store').createRecord('to-do-list/templatetask', {
        description: description,
        room: this.get('room'),
        day: this.get('store').peekRecord('to-do-list/day', frequency),
        updatable: false
      });
      template.save().then(() => {
        this.set('updated', new Date());
      });
    },
    delete(room) {
      return room.destroyRecord().then(() => {
        this.set('delete', null);
      });
      room.save();
    },
  }
});
