'use strict'

module.exports = function(app) {
  var geocoder = require('../controllers/geocoderController');

  app.route('/geocode')
    .get(geocoder.get_geocode_data);

  app.route('/pulse')
    .get(geocoder.check_for_pulse);


}