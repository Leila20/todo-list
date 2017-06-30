import { moduleForModel, test } from 'ember-qunit';

moduleForModel('to_do_list/room', 'Unit | Model | to_do_list/room', {
  // Specify the other units that are required for this test.
  needs: ['model:to_do_list/templatetask', ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

