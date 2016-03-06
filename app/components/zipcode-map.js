import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['zipcode-map'],
  lat: 39,
  lng: -104,
  zoom: 4,

  zipcodes: null,

  warehouses: Ember.A([
    { location: [45.528298, -122.662986],
      name: 'Portland',
      address: '777 NE Martin Luther King Jr Blvd, Portland, OR 97232'
    }
  ]),

  actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
    }
  }

});
