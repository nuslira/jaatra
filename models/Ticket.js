var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TicketSchema = {
  
  ticketPrice:{
    type: Number,
    trim: true,
    required: 'Ticket Price required'
  },
  pickup:{
   type: String,
   trim: true,
   required: 'Pickup required'
 },
 
 destination:{
   type: String,
   trim: true,
   required: 'Destination required'
 },
 
 deprtime:{
   type: String,
   trim: true,
   required: 'Depature time required'
 },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  
  bus: {
    type: Schema.ObjectId,
    ref: 'Bus'
  },

  created: {
    type: Date,
    default: Date.now
  }
  
}

var Ticket = mongoose.model('Ticket', TicketSchema, 'tickets');
module.exports = Ticket;
