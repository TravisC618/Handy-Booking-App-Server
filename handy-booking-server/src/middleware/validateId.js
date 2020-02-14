const { ObjectId } = require("mongoose").Types;
const { formatResponse } = require("../utils/helper");

module.exports = (req, res, next) => {
  const { id, tradieId } = req.params;
  if (!ObjectId.isValid(id)) {
    return formatResponse(res, 400, "Invalid id", null);
  }
  if (tradieId && !ObjectId.isValid(tradieId)) {
    return formatResponse(res, 400, "Invalid id", null);
  }
  return next();
};
