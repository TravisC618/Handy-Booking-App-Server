const logger = require("../../config/logger");
const { formatResponse } = require("../utils/helper");

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    logger.error(err.message);
    return formatResponse(res, 400, err.message, null);
  }

  // return res.json(err);
  return formatResponse(res, 500, "Something unexpected happened");
};
