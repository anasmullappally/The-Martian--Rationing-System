var mongoose = require("mongoose");

const rationSchema = new mongoose.Schema({
  packetType: {
    type: String,
    enum: ["food", "water"],
  },
  packetId: {
    type: String,
    required: true,
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
  quantityInLiters: {
    type: Number,
  },
});

module.exports = mongoose.model("ration", rationSchema);
