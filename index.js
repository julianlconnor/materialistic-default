/**
* Plugin for scraping machusonline.
*/
var _ = require('lodash');
var Promise = require('bluebird');
var parseUrl = Promise.promisify(require('node-microdata-scraper').parseUrl);

function parseJSON(json) {

  json.forEach(function(schema) {
    var properties = schema.properties;
    if ( schema.name === 'http://schema.org/Product' ) {
      data.name = properties.name;
    } else if ( schema.name === 'http://schema.org/Offer' ) {
      data.inStock = properties.availability === 'InStock';
      data.price = properties.price;
      data.currency = properties.priceCurrency;
    }
  });

  return Promise.resolve(data);
}

module.exports = {
  fetch: function(url) {
    return parseUrl(url).then(parseJSON).then(function(data) {
      return _.extend(data, { url: url });
    });
  }
};
