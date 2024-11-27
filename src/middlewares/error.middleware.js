const CodeError = require("../helpers/error.helper");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof CodeError) {
    return res.status(err.code).send({ error: err.message });
  }
  res.status(500).send({ error: "Something broke!" });
};

module.exports = errorHandler;
