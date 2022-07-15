const { Schema, model } = require("mongoose");

const statSchema = require("./Stat");

const playerSchema = new Schema({
  // _id: ObjectId(),
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  number: {
    type: Number
  },
  position: {
    type: [String]
  },
  handedness: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  stats: [statSchema],
},
{
  toJSON: {
    virtuals: true,
  }
});

const Player = model("Player", playerSchema)

module.exports = Player;
