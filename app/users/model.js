const mongose = require("mongoose");

let userSchema = mongose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email Harus Diisi "],
    },
    name: {
      type: String,
      require: [true, "Nama Harus Diisi "],
    },
    password: {
      type: String,
      require: [true, "Kata Sandi Harus Diisi "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      require: [true, "Nomor Telephone Harus Diisi "],
    },
  },
  { timestamps: true }
);

module.exports = mongose.model("User", userSchema);
