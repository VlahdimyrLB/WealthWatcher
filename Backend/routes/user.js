const express = require("express");
const router = express.Router();

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

router.route("/").get(getAllUsers).post(createUser);

router.post("/register", registerUser);
router.get("/getMe", protect, getMe);
router.post("/login", loginUser);

router
  .route("/:userId")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
