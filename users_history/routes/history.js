const express = require("express");
const {
  addHistory,
  getHistoryByUserId,
  getHistory,
} = require("../controllers/historyController");
const { validateAddHistory } = require("../validators/historyValidator");

const router = express.Router();

router.get("/", getHistory);
router.post("/", validateAddHistory, addHistory);
router.get("/:userId", getHistoryByUserId);

module.exports = router;
