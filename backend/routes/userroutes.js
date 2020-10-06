const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  getUser,
  DeleteUser,
  updateUserProfile,
  getUserById,
  UpdateUser,
} = require("../controller/usercontroller");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, DeleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, UpdateUser);
module.exports = router;
