const headers = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.setHeader('Content-Type', 'application/json');
}

module.exports.error = (res, error = 'Error', statusCode = 500) => {
  headers(res);

  res.statusCode = statusCode;

  res.end(JSON.stringify({
    error
  }, null, 3));
};

module.exports.success = (res, data = null) => {
  headers(res);

  res.statusCode = 200;

  res.end(JSON.stringify({
    data
  }, null, 3));
};
