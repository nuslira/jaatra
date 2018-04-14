var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BusSchema = {
  
  busLicense:{
    type: String,
    trim: true,
   // unique: 'Bus already exists',
   // match: [/.+\@.+\..+/, 'Please fill a valid licesnce plate number'],
    //required: 'Unique ID required'
  },
  
  enterpriseName: {
    type: String,
    trim: true,
    required: 'Name required'
  },

  busClass: {
    type: String,
    trim: true,
    required: 'Bus Type required'
  },
  
  

  capacity: {
    type: Number,
    trim: true,
    required: 'Seat Capacity required'
  },
  

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
  
}

var Bus = mongoose.model('Bus', BusSchema, 'buses');
module.exports = Bus;
