const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/getMe", protect, getMe);
router.route("/").get(protect, getAllUsers).post(protect, createUser);
router
  .route("/:userId")
  .get(protect, getSingleUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
