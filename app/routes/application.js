import Ember from 'ember';
import jQuery from 'jquery';

const {
  Route,
  run,
  RSVP
  } = Ember;

const {
  Promise
  } = RSVP;

export default Route.extend({

  total: null,
  pages: null,
  nextFetch: 0,
  fetchInterval: 100,

  model() {
    return new Promise((resolve, reject) => {
      jQuery.ajax({
        method: 'GET',
        url: 'api/zipcodes',
        success: resolve,
        error: reject
      });
    })
    .then((data) => {
      this.total = data.zipcodes.total;
      this.pages = Ember.A();

      this.fetchNext();

      return {
        pages: this.pages,
        count: data.zipcodes.total
      };
    });
  },

  fetchPage(id) {
    return new Promise((resolve, reject) => {
      jQuery.ajax({
        method: 'GET',
        url: `api/zipcodes/${id}`,
        success: resolve,
        error: reject
      });
    }).then((data) => {
      console.log('Fetched Page:', id);
      this.pages.pushObject(data.zipcodes);
      return true;
    });
  },

  fetchNext() {
    this.fetchPage(this.nextFetch)
      .then(() => {
        this.nextFetch++;
        if (this.nextFetch < this.total) {
          run.later(this, this.fetchNext, this.fetchInterval);
        }
      })
  }



});
