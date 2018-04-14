var mongoose = require('mongoose');
var Bus = require('./../models/Bus.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Bus.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};


module.exports.createBus = function(req, res){
  res.render('./../public/views/bus/addBus.ejs', {
    user: req.user || null,
    request: req
   
  });
}

module.exports.thankyouView = function(req, res){
  res.render('./../public/views/others/thankyou.ejs', {
  });
}

module.exports.contactView = function(req, res){
  res.render('./../public/views/others/contact.ejs', {
  });
}
module.exports.aboutView = function(req, res){
  res.render('./../public/views/others/about.ejs', {
  });
}
module.exports.enterpriseListView = function(req, res){
  res.render('./../public/views/others/enterpriseList.ejs', {
  });
}

module.exports.ticket_thakyouView = function(req, res){
  res.render('./../public/views/others/thankyou_ticket.ejs', {
  });
}

module.exports.listView = function(req, res){
  
  Bus.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");
  
  res.render('./../public/views/bus/BusList.ejs', {
    user: req.user || null,
    request: req,
    buses: data
  });

}
});
};

module.exports.create = function(req, res) {
  var bus = new Bus(req.body);
  bus.user = req.user;
  bus.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.bus);
};


exports.delete = function(req, res) {
	var bus = req.bus;
	bus.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(bus);
		}
	});
};


module.exports.update = function(req, res) {
  var bus = req.bus;

  	bus = _.extend(bus, req.body);

  	bus.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(bus);
  		}
  	});
};

exports.busByID = function(req, res, next, id) {
	Bus.findById(id).populate('user', 'email').exec(function(err, bus) {
		if (err) return next(err);
		if (!bus) return next(new Error('Failed to load bus ' + id));
		req.bus = bus;
		next();
	});
};
