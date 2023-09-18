const errorHandler = (error, req, res, next) => {
  const errorStatus = res.status ? res.status : 500;

  //we can use the switch to make the app work with the multiple errors
  res.json({ message: error.message, stackTrace: error.stack });
};

module.exports = errorHandler;
