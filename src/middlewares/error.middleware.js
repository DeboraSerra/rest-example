const CodeError = require("../helpers/error.helper");
const { statusCodes } = require("../statusCodes");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof CodeError) {
    return res.status(err.code).send({ error: err.message });
  }
  res
    .status(statusCodes.INTERNAL_SERVER_ERROR)
    .send({ error: "Something broke!" });
};

module.exports = errorHandler;
