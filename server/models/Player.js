const { Schema } = require("mongoose");

const statSchema = require("./Stat");

const playerSchema = new Schema({
  _id:  ObjectId(),
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: [String],
    required: true,
  },
  handedness: {
    type: String,
    required: true,
  },
  statId: [statSchema],
});

module.exports = playerSchema;
