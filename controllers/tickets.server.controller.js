var mongoose = require('mongoose');
var Ticket = require('./../models/Ticket.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  console.log(req.query);
  Ticket.find({pickup:req.query.pickup,destination:req.query.destination}).populate("bus","capacity enterpriseName busClass").exec(function(err, data) {
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



module.exports.createTicket = function(req, res){
  res.render('./../public/views/ticket/addTicket.ejs', {
    user: req.user || null,
    bus: req.bus
    //request: req
   
  });
}


module.exports.singleTicketView = function(req, res){
  res.render('./../public/views/ticket/singleTicket.ejs', {
    user: req.user || null,
    ticket: req.ticket
   
  });
}


module.exports.searchView= function(req, res){
  
  Ticket.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");
  
  res.render('./../public/views/ticket/searchticket.ejs', {
    user: req.user || null,
    request: req,
    tickets: data
  });

}
});
};


module.exports.listView = function(req, res){
  
  Ticket.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");
  
  res.render('./../public/views/ticket/ticketList.ejs', {
    user: req.user || null,
    request: req,
    //tickets: data
  });

}
});
};

module.exports.create = function(req, res) {
  var ticket = new Ticket(req.body);
  ticket.user = req.user;
  
  ticket.save(function(err, data) {
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
  res.json(req.ticket);
};


exports.delete = function(req, res) {
	var ticket = req.ticket;
	ticket.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(ticket);
		}
	});
};


module.exports.update = function(req, res) {
  var ticket = req.ticket;

  	ticket = _.extend(ticket, req.body);

  	ticket.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(ticket);
  		}
  	});
};

exports.ticketByID = function(req, res, next, id) {
	Ticket.findById(id).populate('bus', 'enterpriseName').exec(function(err, ticket) {
		if (err) return next(err);
		if (!ticket) return next(new Error('Failed to load ticket ' + id));
		req.ticket = ticket;
		next();
	});
};
 