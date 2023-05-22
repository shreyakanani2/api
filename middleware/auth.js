const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utills/errorResponse");
const User = require("../models/user");

//protect routes

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
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

//grant access as per user role

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.User.role} is not authorized to access this route`
        ),
        403
      );
    }
    next();
  };
};
