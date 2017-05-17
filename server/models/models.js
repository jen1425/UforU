var connection = require('./dbConnection').connection;
var mySearchFunction = require('./queryHelper.js').mySearchFunction;
var asyncMap = require('./queryHelper.js').asyncMap;
var querySchoolTable = require('./queryHelper.js').querySchoolTable;

module.exports = {
  colleges: {
    get: function(cb) {
      connection.query('SELECT name, address, state, description, admission_rate, tuition, size, average_gpa, average_sat_score, sports_division, website_url, image_url FROM Universities', function(err, results, fields) {
        if (err) {
          cb (err, null);
        } else {
          cb(null, results);
        }
      });
    },
    getSuggestions: function(params, cb) {
      mySearchFunction(params, function(err, data) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, data);
        }
      });
    }
  },

  signup: {
    post: function(username, cb) {
      connection.query('SELECT id FROM users WHERE (username =' + username, function(err, results, fields) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
        }
      });
    }
  }
};