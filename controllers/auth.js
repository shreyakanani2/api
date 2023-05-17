const ErrorResponse = require("../utills/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //create token
  const token = user.getSignedJWTToken();

  res.status(200).json({ success: true, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return new ErrorResponse("Please provice email and password", 400);
  }

  //check user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return new ErrorResponse("Invalid credential", 401);
  }

  //check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return new ErrorResponse("Invalid credential", 401);
  }

  //create token
  const token = user.getSignedJWTToken();

  res.status(200).json({ success: true, token });
});
