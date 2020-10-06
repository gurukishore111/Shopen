const asyncHandler = require("express-async-handler");
const User = require("../model/usermodel");
const generateToken = require("../utils/generateToken");

//desc   Auth user & token
//route  POST api/users/login
//access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//desc   Reg user & token
//route  POST api/users/
//access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      address: address,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user Data");
  }
});

//desc   Get user profile
//route  GET api/users/profile
//access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, getUserProfile, registerUser };

//desc   Update user profile
//route  PUT api/users/profile
//access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    user.address = req.body.address || user.address;

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
      address: updateUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//desc Get all user
//routes GET api/users
//access Private/Admin

const getUser = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
  //console.log(user);
});

//desc Delete all user
//routes Delete api/users/:id
//access Private/Admin

const DeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed!" });
  } else {
    res.status(404);
    throw new Error("User not founded");
  }

  res.json(user);
  //console.log(user);
});

// desc    Get user by ID
// route   GET /api/users/:id
// access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// desc    Update user
// route   PUT /api/users/:id
// access  Private/Admin
const UpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUser,
  DeleteUser,
  getUserById,
  UpdateUser,
};
