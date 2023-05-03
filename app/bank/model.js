const mongose = require("mongoose");

let bankSchema = mongose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama Pemilik Harus diisi "],
    },

    bankName: {
      type: String,
      require: [true, "Nama Bank  Harus diisi "],
    },
    noRekening: {
      type: String,
      require: [true, "No Rekening bank  Harus diisi "],
    },
  },
  { timestamps: true }
);

module.exports = mongose.model("Bank", bankSchema);

// nameBank >> sebelumnya
