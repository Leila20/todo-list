import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  lists: Ember.computed(function() {
    const lists = this.get('store').findAll('list/lists');
  }),

  actions: {
    delete(list) {
      return list.destroyRecord().then(() => {
        this.set('delete', null);
      });
      list.save();
    },
  }
});
