const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user.id : params.id }, { email: params.email }],
    });

    if (!foundUser) {
      return res.status(404).json({ message: "Could not find this user!" });
    }

    res.json(foundUser);
  },
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    const token = signToken(user);
    res.json({ user, token });
  },
  async login({ body }, res) {
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPw = await user.isCorrectPassword(body.password);
    if (!correctPw) {
      // for testing purpouses if password is not correct, it will throw "Wrong password"
      // !NEEDS to be changed to "Incorrect email or password!" in the future
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = signToken(user);
    res.json({ user, token });
  },
  async savePlayer({ user, params, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { $or: [{ _id: user ? user.id : params.id }, { email: params.email }] },
        { $addToSet: { saved_players: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async removePlayer({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { $or: [{ _id: user ? user.id : params.id }, { email: params.email }] },
      { $pull: { saved_players: { _id: params._id } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(updatedUser);
  },
};
