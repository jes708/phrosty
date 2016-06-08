const express = require('express');
const router = express.Router();
const db = require('../../db/_db');
const Order = db.model('order');

module.exports = router;

router.get('/', function (req, res, next) {
  Order.findAll()
  .then(orders => res.json(orders))
  .catch(next);
});

router.post('/:userId/:addressId', function (req, res, next){
  return Order.create(req.body)
  .then(function(order){
  	order.addressId = req.params.addressId;
  	order.userId = req.params.userId;
  	return order.save();
  })
  .then(order => res.status(201).send(order))
  .catch(next);
});

router.delete('/:id', function (req, res, next){
  Order.findById(req.params.id)
  .then(function(order){
    if(order){
      Order.destroy({where: {id: req.params.id}})
      return res.status(204).send(order);
    }
    else {
      return res.status(404).send('not found');
    }
  })
  .catch(next);
});

router.put('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(function(order){
    if (order){
      order.update(req.body)
      .then (function(order){
        return res.status(200).send(order);
      })
    }
    else {
      return res.status(404).send('not found');
    }
  })
  .catch(next);
})