import { moduleForModel, test } from 'ember-qunit';

moduleForModel('to_do_list/day', 'Unit | Model | to_do_list/day', {
  // Specify the other units that are required for this test.
  needs: ['model:to_do_list/templatetask', ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

