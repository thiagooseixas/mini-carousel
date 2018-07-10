const fs = require("fs");

const helpers = require('./../helpers/return');
const config = require('./../../settings');


class ProductController {
  // GET /Product/:id
  async show(req, res, param) {
    const DB = config.config.DB_CONFIG;

    try {
      const contents = fs.readFileSync(DB.url);
      const products = JSON.parse(contents);

      for (var product in products) {
        if (param == products[product].reference.item.businessId) {
          const result = products[product];
          return helpers.success(res, result);
        } else {
          return helpers.error(res, error);
        }
      }

    } catch (error) {
      return helpers.error(res, error);
    }

  }
}

module.exports = new ProductController();
