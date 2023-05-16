const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, total: products.length, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    if (!products) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!products) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);

    if (!products) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
