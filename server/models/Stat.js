const { Schema } = require("mongoose");

const statSchema = new Schema({
  _id: ObjectId(),
  inning: {
    type: Number,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  balls: {
    type: Number,
    required: true,
  },
  strikes: {
    type: Number,
    required: true,
  },
  rbi: {
    type: Number,
    required: true,
  },
  run: {
    type: Boolean,
    required: true,
  },
  stolenBase: {
    type: Number,
    required: true,
  },
});

module.exports = statSchema;