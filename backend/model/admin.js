const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const AdminSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "ADMIN",
      enum: ["SUPERADMIN", "ADMIN"],
    },
    accessToken: {
      type: String,
      default: "",
    },
    forgotpasswordtoken: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    LeadForward: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

AdminSchema.methods.authenticate = function (password, callback) {
  const promise = new Promise((resolve, reject) => {
    if (!password) reject(new Error("MISSING_PASSWORD"));

    bcrypt.compare(password, this.password, (error, result) => {
      if (!result) reject(new Error("WRONG_PASSWORD"));
      resolve(this);
    });
  });

  if (typeof callback != "function") return promise;
  promise
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
};

AdminSchema.methods.setPassword = function (password, callback) {
  const promise = new Promise((resolve, reject) => {
    if (!password) reject(new Error("MISSING_PASSWORD"));

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      this.password = hash;
      resolve(this);
    });
  });

  if (typeof callback != "function") return promise;
  promise
    .then((result) => callback(null, result))
    .catch((err) => callback(err));
};
module.exports = mongoose.model("Admin", AdminSchema);
