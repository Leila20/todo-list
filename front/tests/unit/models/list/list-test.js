import { moduleForModel, test } from 'ember-qunit';

moduleForModel('list/list', 'Unit | Model | list/list', {
  // Specify the other units that are required for this test.
  needs: ['model:list/listitem', ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

