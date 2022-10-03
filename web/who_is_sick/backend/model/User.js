const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { 
      type: String, 
      required: true, 
      trim: true 
    },
    id: mongoose.Schema.Types.ObjectId,
  
  });


module.exports = User = mongoose.model('user', UserSchema);