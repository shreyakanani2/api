const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utills/errorResponse");
const User = require("../models/user");

//protect routes

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse(`Not authorized to access this route`), 401);
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.User = await User.findById(decode.id);

    next();
  } catch (error) {
    return next(new ErrorResponse(`Not authorized to access this route`), 401);
  }
});
