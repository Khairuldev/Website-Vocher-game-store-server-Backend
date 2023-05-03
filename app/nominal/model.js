const mongose = require("mongoose");

let nominalSchema = mongose.Schema({
  coinQuantity: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    require: [true, "Nama Coin Harus diisi "],
  },
  price: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongose.model("Nominal", nominalSchema);
