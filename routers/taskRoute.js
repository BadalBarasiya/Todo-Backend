const express = require("express");
const router = express.Router();

const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskcontroller");

const authMiddleware = require("../middleware/middleware");

router.post("/createTask", authMiddleware, createTask);
router.get("/getTask", authMiddleware, getTask);
router.post("/updateTask", authMiddleware, updateTask);
router.put("/deleteTask", authMiddleware, deleteTask);

module.exports = router;