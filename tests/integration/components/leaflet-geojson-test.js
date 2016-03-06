import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('leaflet-geojson', 'Integration | Component | leaflet geojson', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{leaflet-geojson}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#leaflet-geojson}}
      template block text
    {{/leaflet-geojson}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
