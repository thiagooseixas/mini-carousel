const productController = require('./../controllers/ProductController');

const routes = [{
    method: 'GET',
    path: /\/product\/([0-9a-z]+)/,
    controller: productController.show.bind(productController)
  }
];

module.exports = routes;
