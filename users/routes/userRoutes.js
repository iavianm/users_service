const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  getUsers,
} = require("../controllers/userController");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../validators/userValidator");

router.post("/", validateCreateUser, createUser);
router.patch("/:id", validateUpdateUser, updateUser);
router.get("/", getUsers);

module.exports = router;
