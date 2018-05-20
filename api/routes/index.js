'use strict'

module.exports = function(app) {
  var geocoder = require('../controllers/geocoderController');

  app.route('/geocoder')
    .post(geocoder.get_geocode_data);


}