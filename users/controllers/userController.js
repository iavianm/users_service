const { User } = require("../models");
const { sendUserChanges } = require("../services/historyService");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    await sendUserChanges({
      userId: user.id,
      action: "Create user",
      details: req.body,
      timestamp: new Date(),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new Error("User not found");
    const previousValues = JSON.parse(JSON.stringify(user));
    const updateUser = await user.update(req.body);

    const changedFields = Object.keys(updateUser.dataValues).reduce(
      (acc, key) => {
        if (
          updateUser.dataValues[key] !== previousValues[key] &&
          key !== "createdAt" &&
          key !== "updatedAt"
        ) {
          acc[key] = updateUser.dataValues[key];
        }
        return acc;
      },
      {},
    );

    await sendUserChanges({
      userId: user.id,
      action: "Update user",
      details: changedFields,
      timestamp: new Date(),
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
