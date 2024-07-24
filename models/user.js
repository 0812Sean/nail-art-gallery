const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
},
  password: { 
    type: String, 
    required: true 
},
  bio: String,
  profile_picture_url: String
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  
module.exports = mongoose.model('User', userSchema);
