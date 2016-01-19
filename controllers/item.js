// Load required packages
var Item = require('../models/item');

// Create endpoint /api/items for POST
exports.postItems = function(req, res) {

  // Create a new instance of the Item model
  var item = new Item();

  // Set the item properties that came from the POST data
  item.name = req.body.name;
  item.type = req.body.type;
  item.quantity = req.body.quantity;
  item.userId = req.user._id;

  // Save the item and check for errors
  item.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item added to Store', data: item });
  });
};

// Create endpoint /api/items for GET
exports.getItems = function(req, res) {
  // Use the Item model to find all item
  Item.find({ userId: req.user._id }, function(err, items) {
    if (err)
      res.send(err);

    res.json(items);
  });
};

// Create endpoint /api/items/:item_id for GET
exports.getItem = function(req, res) {
  // Use the Item model to find a specific item
  Item.find({ userId: req.user._id, _id: req.params.item_id }, function(err, item) {
    if (err)
      res.send(err);

    res.json(item);
  });
};

// Create endpoint /api/items/:item_id for PUT
exports.putItem= function(req, res) {
  // Use the Item model to find a specific item
  Item.update({ userId: req.user._id, _id: req.params.item_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/items/:item_id for DELETE
exports.deleteItem= function(req, res) {
  // Use the Item model to find a specific item and remove it
  Item.remove({ userId: req.user._id, _id: req.params.item_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item removed from store' });
  });
};