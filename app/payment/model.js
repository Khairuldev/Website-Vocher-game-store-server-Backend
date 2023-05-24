const mongose = require("mongoose");

let paymentSchema = mongose.Schema(
  {
    type: {
      type: String,
      require: [true, "Tipe Pembayaran Harus diisi "],
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    banks: [
      {
        type: mongose.Schema.Types.ObjectId,
        require: true,
        ref: "Bank",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongose.model("Payment", paymentSchema);
