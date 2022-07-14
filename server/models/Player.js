const { Schema } = require("mongoose");

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
