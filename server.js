// Load required modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var itemController = require('./controllers/item');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to the store MongoDB
mongoose.connect('mongodb://localhost:27017/store');

// Define Express application here
var app = express();

// Body parser to parse get/post request
app.use(bodyParser.urlencoded({
  extended: true
}));

// passport to authenticate request
app.use(passport.initialize());

// create express route
var router = express.Router();

// Create endpoint handlers for /users
router.route('/api/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// endpoint for /items
router.route('/api/items')
  .post(authController.isAuthenticated, itemController.postItems)
  .get(authController.isAuthenticated, itemController.getItems);

// endpoint for /items/:item_id
router.route('/api/items/:item_id')
  .get(authController.isAuthenticated, itemController.getItem)
  .put(authController.isAuthenticated, itemController.putItem)
  .delete(authController.isAuthenticated, itemController.deleteItem);

// Register all  routes
app.use(router);

// Now start the server
app.listen(3000);