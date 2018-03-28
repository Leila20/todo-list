import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('to-do-list/room');
  },

  actions: {
    save(name) {
      const room = this.get('store').createRecord('to-do-list/room', {
        name: name,
      });
      room.save();
    },
  }
});

