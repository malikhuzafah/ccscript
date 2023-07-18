const { validateUserLogin } = require("../models/user");

function validateLogin(req, res, next) {
  let { error } = validateUserLogin(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  next();
}

module.exports = validateLogin;
