var router = require('express').Router();
var controllers = require('../controllers/controllers.js');

router.get('/api/colleges', controllers.colleges.get);

router.post('/api/colleges/suggestions', controllers.colleges.getSuggestions);

router.post('/signup', controllers.signup.post);

module.exports = router;