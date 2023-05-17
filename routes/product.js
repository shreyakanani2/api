const express = require("express");
const {
  getProduct,
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
} = require("../controllers/product.js");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, updateProducts)
  .delete(protect, deleteProducts);

module.exports = router;
