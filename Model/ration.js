var mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  food: {
    type: Boolean,
    default: true,
  },
  packetId: {
    type: String,
    required: true,
    unique: true,
  },
  packetContent: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
  calories: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const waterSchema = new mongoose.Schema({
  water: {
    type: Boolean,
    default: true,
  },
  packetId: {
    type: String,
    required: true,
    unique: true,
  },
  quantityInLiters: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

let food = mongoose.model("food", foodSchema, "ration");
let water = mongoose.model("water", waterSchema, "ration");

module.exports = {
  food,
  water,
};
