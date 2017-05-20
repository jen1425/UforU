var models = require('../models/models.js');

module.exports = {
  colleges: {
    get: function(req, res) {
      models.colleges.get(function(err, data) {
        if (err) {
          res
            .status(500)
            .send(err);
        } else {
          res
            .status(200)
            .send(data);
        }
      });
    },
    getSuggestions: function(req, res) {
      console.log('get suggestions controller on the server');
      var body = req.body;
      for (let key in body) {
        if (body[key] === undefined || body[key] === '' || body[key].length === 0) {
          delete body[key];
        }
      }

      models.colleges.getSuggestions(body, function(err, data) {
        if (err) {
          res
            .status(500)
            .send(err);
        } else {
          res
            .status(200)
            .send(data);
        }
      });
    }
  },

  signup: {
    post: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      console.log('got to signup controller');
      models.signup.post(username, password, function(err, results) {
        if (err) {
          console.log('Controller for signup error');
          res.status(404).send();
        } else {
          console.log('Controller redirect');
          req.session.user = username;
          res.send('User Created');
        }
      });
    }
  },

  login: {
    post: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;

      models.login.post(username, password, function(err, results) {
        if (err) {
          console.log('Error in login', err);
          res.status(404).send();
        } else {
          req.session.user = username;
          res.status(200).send('User logged in Controller');
          console.log(results);
        }
      });
    }
  },

  favorites: {
    post: function(req, res) {
      var username = req.session.user;
      var collegeID = req.body.collegeId;
      console.log('username and collegeID ', username, collegeID);
      models.favorites.post(username, collegeID, function(error, results) {
        if (!error) {
          res.status(200)
          .send('College added successfully to favorites');
        }
      });
    },
    get: function(req, res) {
      var username = req.session.user;
      models.favorites.get(username, function(error, results) {
        if (error) {
          console.log('controller favorites get error', error);
          res.send(error);
        } else {
          res.send(results);
        }
      });
    },
    delete: function(req, res) {
      var username = req.session.user;
      var collegeID = req.body.collegeId;
      console.log('The user ', username, ' will have ', collegeID, ' removed from the DB.');
      models.favorites.delete(username, collegeID, function(error, results) {
        if (!error) {
          res.send(JSON.parse(results));
        } else {
          console.log('error for delete favs controller', error);
          res.send(error);
        }
      });
    }
  },

  auth: {
    post: function(req, res) {
      var session = req.session;
      if (session.user) {
        res.send(session.user);
      } else {
        res.send(null);
      }
    }
  },

  logout: {
    post: function(req, res) {
      console.log('controllers.js logout post');
      req.session.destroy(function(err) {
        if (err) {
          res.status(404).send();
        } else {
          res.send('Logout Successful');
        }
      });
    }
  }

};