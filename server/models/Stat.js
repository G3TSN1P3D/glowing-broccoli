const { Schema } = require("mongoose");

const statSchema = new Schema({
  // _id: ObjectId(),
  inning: {
    type: Number
  },
  order: {
    type: Number
  },
  balls: {
    type: Number
  },
  strikes: {
    type: Number
  },
  rbi: {
    type: Number
  },
  run: {
    type: Boolean
  },
  stolenBase: {
    type: Number
  },
});

module.exports = statSchema;