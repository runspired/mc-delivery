import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import PathLayer from 'ember-leaflet/components/path-layer';
import PopupMixin from 'ember-leaflet/mixins/popup';
/* global L */

/**
 * An ember-leaflet wrapper for L.geoJson, which renders GeoJson data onto a
 * map as features.
 *
 * NOTE: this layer uses Leaflet's standard SVG rendering for GeoJSON, so it's
 * probably slow.
 *
 * Takes:
 *   - data (the GeoJSON) object to render
 *   - all standard leaflet options for L.geoJson
 */
export default BaseLayer.extend(PopupMixin, {
  leafletOptions: [
    'pointToLayer',
    'onEachFeature',
    'filter',
    'style',
    'coordsToLatLng',
    ...PathLayer.prototype.leafletOptions
  ],

  pages: null,
  rendered: null,
  pushDataToLeaflet: Ember.observer('pages.[]', function() {
    const data = this.get('pages');
    if (!this._layer || !data) {
      return;
    }

    let last = this.rendered;
    if (!last && last !== 0) {
      last = 0;
    } else {
      last = last + 1;
    }

    for (let i = last; i < data.length; i++) {
      //...then add new data to recreate the child layers in an updated form
      this._layer.addData(data[i]);
    }

    this.rendered = data.length - 1;
  }),

  createLayer() {

    let defaultStyle = {
      fillColor: "#ff7800",
      color: "#000",
      clickable: false,
      weight: 0,
      CANVAS: true,
      SVG: false,
      opacity: 0.5,
      fillOpacity: 0.5,
      stroke: false
    };

    let options = Ember.merge(this.get('options'), {
      style: function(feature) {
        let s = Ember.copy(defaultStyle);
        s.fillColor = `#0${feature.id}`;
        s.color = s.fillColor;

        return s;
      }
    });
    return L.geoJson(null, this.get('options'));
  },

  didCreateLayer() {
    this._super(...arguments);
    this.pushDataToLeaflet();
  }

});
