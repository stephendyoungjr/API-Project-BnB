const { validationResult, check } = require("express-validator");
const { Model } = require("sequelize");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.path] = error.msg));

    const err = Error("Bad request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request";
    next(err);
  }
  next();
};
module.exports = { handleValidationErrors};