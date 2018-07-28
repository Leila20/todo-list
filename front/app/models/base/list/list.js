/* eslint-disable */
// This base model was auto-generated by export_app
// PLEASE DO NOT EDIT
// you can make changes in app/models/list/list.js
// or regenerate this file by running
// `./manage.py export list/lists`

  import Model from 'ember-data/model';


import attr from 'ember-data/attr';


import { hasMany } from 'ember-data/relationships';


export default Model.extend({
  
    name: attr('string'),
  
    __str__: attr('string'),
  
  
    items: hasMany('list/listitem', {
      async: true,
      inverse: 'lst',
    }),
  
});
