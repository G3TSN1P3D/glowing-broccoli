const { Player } = require("../models");

module.exports = {
  async getSinglePlayer({ player = null, params }, res) {
    const foundPlayer = await Player.findOne({
      _id: player ? player.id : params.id,
    });

    if (!foundPlayer) {
      return res.status(404).json({ message: "Could not find this player!" });
    }
    res.json(foundPlayer);
  },
  async saveStat({ player, params, body }, res) {
    console.log(player);
    try {
      const updatedPlayer = await Player.findOneAndUpdate(
        { _id: player ? player.id : params.id },
        { $addToSet: { stats: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedPlayer);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async removeStat({ user, params }, res) {},
};
