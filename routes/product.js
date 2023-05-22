const express = require("express");
const {
  getProduct,
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
} = require("../controllers/product.js");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();
  
router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("admin"), createProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin"), updateProducts)
  .delete(protect, authorize("admin"), deleteProducts);

module.exports = router;
