const helpers = require('./../helpers/return');

module.exports = async (req, res, routes) => {

  // Get id from request
  let param = null;

  let body = null;

  // Find route
  const route = routes.find((route) => {
    return route.method === req.method;
  });

  if (route) {
    param = req.url.match(route.path)[1];

    return route.controller(req, res, param, body);
  } else {
    return helpers.error(res, 'not found', 404);
  }
};
