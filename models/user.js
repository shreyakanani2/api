const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  //encrypt password with bcrypt

  UserSchema.pre('save', async function(next) {
    const Salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, Salt);
  });

  UserSchema.methods.getSignedJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
  }

  //match user password to hashed password
  UserSchema.methods.matchPassword = async function(enterredPassword){
    return await bcrypt.compare(enterredPassword, this.password);
  }

  module.exports = mongoose.model('User', UserSchema);