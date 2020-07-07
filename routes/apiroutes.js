const express = require('express');
const SignUpController = require('../controllers/auth/SignupController');
const SignInController = require('../controllers/auth/SinginController');

const APIROUTER = express.Router();

APIROUTER.post('/sign-up', SignUpController.registerUser);
APIROUTER.post('/sign-in', SignInController.signIn);

module.exports = APIROUTER;