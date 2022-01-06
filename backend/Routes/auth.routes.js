const express = require('express'),
router = express.Router();
const { signup, login } = require('../Controllers/auth.controller');

//Signup
//POST /api/auth
router.post('/signup', signup);

//Login
//POST /api/auth
router.post('/login', login);


module.exports = router;
