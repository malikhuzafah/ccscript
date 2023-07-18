const { validate } = require("../models/task");

function validateTask(req, res, next) {
  let { error } = validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  next();
}

module.exports = validateTask;
