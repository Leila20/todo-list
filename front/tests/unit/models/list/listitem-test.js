import { moduleForModel, test } from 'ember-qunit';

moduleForModel('list/listitem', 'Unit | Model | list/listitem', {
  // Specify the other units that are required for this test.
  needs: ['model:list/list', ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

