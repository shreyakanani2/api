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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

//get token from model and create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: false,
    secure: false
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
