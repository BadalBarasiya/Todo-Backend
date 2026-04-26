const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
} = require("../controllers/usercontroller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.delete("/deleteUser", deleteUser);

module.exports = router;