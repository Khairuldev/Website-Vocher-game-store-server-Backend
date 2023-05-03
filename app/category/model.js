const mongose = require("mongoose");

let categorySchema = mongose.Schema({
  name: {
    type: String,
    require: [true, "Nama Kategori Harus Diisi"],
  },
}, { timestamps: true });

module.exports = mongose.model("Category", categorySchema);
