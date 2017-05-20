var connection = require('./dbConnection').connection;
var mySearchFunction = require('./queryHelper.js').mySearchFunction;
var asyncMap = require('./queryHelper.js').asyncMap;
var querySchoolTable = require('./queryHelper.js').querySchoolTable;
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  colleges: {
    get: function(cb) {
      connection.query('SELECT * FROM Universities', function(err, results, fields) {
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
    post: function(username, password, cb) {
      console.log('beginning of model function for signup');
      connection.query('SELECT * from Users Where username = ?', username, function(err, results, fields) {
        if (err) {
          cb(err, null);
        } else {
          if (results.length !== 0) {
            console.log('USER EXISTS', results);
            cb('User already exists', null);
          } else {
            // hash password and store
            bcrypt.hash(password, null, null, function(err, hash) {
              if (err) {
                console.log('Error hashing password', err);
              } else {
                connection.query('Insert into Users (username, password) Values (?, ?)', [username, hash], function(err, results, fields) {
                  if (err) {
                    cb(err, null);
                  } else {
                    cb(null, 'User successfully created');
                  }
                });
              }
            });
          }
        }
      });
    }
  },

  login: {
    post: function(username, password, cb) {
      connection.query('Select * from Users where username = ? and password = ?', [username, password], function(err, results, fields) {
        if (err) {
          cb(err, null);
        } else {
          if (results.length === 0) {
            cb('Wrong login or password', null);
          } else {
            console.log('RESULT from model', results);
            cb(null, 'User successfully logged in Models');
          }
        }
      });
    }
  },

  favorites: {
    post: function(username, collegeID, callback) {
      connection.query('select id from users where username = ?', username, function(error, rows, fields) {
        var id = JSON.parse(JSON.stringify(rows))[0].id;
        console.log('userID is ', id);
        var dbArray = [id, collegeID];
        connection.query('insert into favoriteus set user_id = ?, university_id = ?', dbArray, function(error, rows, fields) {
          if (!error) {
            console.log('favorite added');
            callback(null, 'Favorite added by the model');
          }
        });
      });
    },
    get: function(username, cb) {
      connection.query('SELECT * FROM universities JOIN  favoriteus ON universities.id = favoriteus.university_id JOIN users ON users.id = favoriteus.user_id WHERE users.username = ?', username, function(err, results, fields) {
        if (err) {
          cb (err, null);
        } else {
          cb(null, results);
        }
      });
    },
    delete: function(username, collegeID, callback) {
      connection.query('select id from users where username = ?', username, function(error, rows, fields) {
        var id = JSON.parse(JSON.stringify(rows))[0].id;
        console.log('userID to delete a favorite is ', id);
        var dbArray = [id, collegeID];
        console.log('DBARRAY --->', dbArray);
        connection.query('DELETE FROM favoriteus WHERE user_id = ? AND university_id = ?', dbArray, function(error, rows, fields) {
          if (error) {
            console.log('error in deleting user says the model');
          } else {
            console.log('rows after deleting from DB ', rows);
            connection.query('SELECT * FROM universities JOIN  favoriteus ON universities.id = favoriteus.university_id JOIN users ON users.id = favoriteus.user_id WHERE users.username = ?', username, function(err, results, fields) {
              if (!err) {
                callback(null, JSON.stringify(results));
              } else {
                callback(err, null);
              }
            });
          }
        });
      });
    }
  },
};