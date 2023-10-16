const { History } = require("../models");

exports.addHistory = async (req, res) => {
  const history = await History.create(req.body);
  res.status(201).json(history);
};

exports.getHistory = async (req, res) => {
  const histories = await History.findAll();
  res.json(histories);
};

exports.getHistoryByUserId = async (req, res) => {
  const histories = await History.findAll({
    where: { userId: req.params.userId },
  });
  res.json(histories);
};
