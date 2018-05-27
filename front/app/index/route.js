import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      rooms: this.get('store').findAll('to-do-list/room'),
      items: this.get('store').findAll('list/list'),
    };
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

