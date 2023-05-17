const Product = require("../models/Product");
const ErrorResponse = require("../utills/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ success: true, total: products.length, data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.findById(req.params.id);

  if (!products) {
    return next(
      new ErrorResponse(`product not found with Id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: products });
});

exports.createProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

exports.updateProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!products) {
    return next(
      new ErrorResponse(`product not found with Id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: products });
});

exports.deleteProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.findByIdAndDelete(req.params.id);

  if (!products) {
    return next(
      new ErrorResponse(`product not found with Id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
