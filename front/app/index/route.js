import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      rooms: this.get('store').findAll('to-do-list/room'),
      lists: this.get('store').findAll('list/list'),
    };
  },

  actions: {
    save(name) {
      const room = this.get('store').createRecord('to-do-list/room', {
        name: name,
      });
      room.save();
    },

    add(todolist) {
      const list = this.get('store').createRecord('list/list', {
        name: name,
      });
      list.save();
    }
  }
});

