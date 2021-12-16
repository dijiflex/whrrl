// User Model

const User = require('../models/userModel');
// Factory Functions.
const factory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//filter unwanted objects when inserting data
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates', 400));
  }

  // 2a) Check if atleast one of the fields is provied
  if (!req.body.fullName && !req.body.email && !req.body.phoneNumber)
    return next(new AppError('Plese Provide the data to be updated', 400));
  const filteredBody = filterObj(
    req.body,
    'fullName',
    'email',
    'phoneNumber',
    'nationality'
  );

  //2b) Filtered out unwanted fields names that are not allowed to be updated
  if (req.file) filteredBody.photo = req.file.filename;

  //2c) check if phone number is valid
  if (req.body.phoneNumber) {
    //TODO: Write a retular expression to detect if the phone mumber provided is valid
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = factory.getOne(User);

/*
  |=============================|
  |      ADMIN CONTROLLERS.     |
  |=============================|
*/

exports.getUserByIdController = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUserController = factory.deleteOne(User);
