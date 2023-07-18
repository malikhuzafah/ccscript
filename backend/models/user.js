const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

var userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data, { abortEarly: false });
}

var User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validateUserLogin = validateUserLogin;
