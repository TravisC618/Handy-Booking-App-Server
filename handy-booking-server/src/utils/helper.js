const formatResponse = (res, statusCode = 200, message, data) => {
  const firstNum = parseInt(statusCode / 100);

  res.status(statusCode).send({
    status: firstNum === 2 ? "success" : "error",
    message,
    data
  });
};

module.exports = { formatResponse };
