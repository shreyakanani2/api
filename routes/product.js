const express = require("express");
const {
  getProduct,
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
} = require("../controllers/product.js");

const router = express.Router();

router.route("/").get(getProducts).post(createProducts);

router.route("/:id").get(getProduct).put(updateProducts).delete(deleteProducts);

module.exports = router;
