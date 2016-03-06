import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('zipcode-map', 'Integration | Component | zipcode map', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{zipcode-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#zipcode-map}}
      template block text
    {{/zipcode-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
