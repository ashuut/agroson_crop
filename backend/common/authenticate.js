const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require("../model");

module.exports.getToken = (data) =>
  jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "30d" });

module.exports.verifyToken = (token) =>
  jwt.verify(token, process.env.SECRET_KEY);

module.exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");
    const decoded = this.verifyToken(token);

    const doc = await Model.Admin.findOne({
      _id: decoded._id,
      accessToken: token,
      isBlocked: false,
      isDeleted: false,
    }).lean();

    if (!doc) throw new Error("INVALID_TOKEN");

    req.user = doc;
    next();
  } catch (error) {
    console.error(error);
    const message =
      String(error.name).toLowerCase() === "error"
        ? error.message
        : "UNAUTHORIZED_ACCESS";
    res.status(401).json({ message });
  }
};
module.exports.verifyVendor = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");

    const decoded = this.verifyToken(token);

    const doc = await Model.Vendor.findOne({
      _id: decoded._id,
      accessToken: token,
    });

    if (!doc) throw new Error("INVALID_TOKEN");
    // console.log(doc);
    req.user = doc;
    next();
  } catch (error) {
    console.error(error);
    const message =
      String(error.name).toLowerCase() === "error"
        ? error.message
        : "UNAUTHORIZED_ACCESS";
    return res.status(401).json({ message });
  }
};
module.exports.verifyUser = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");

    const decoded = this.verifyToken(token);

    const doc = await Model.User.findOne({
      _id: decoded._id,
      accessToken: token,
    }).lean();

    if (!doc) throw new Error("INVALID_TOKEN");

    req.user = doc;
    next();
  } catch (error) {
    console.error(error);
    const message =
      String(error.name).toLowerCase() === "error"
        ? error.message
        : "UNAUTHORIZED_ACCESS";
    return res.status(401).json({ message });
  }
};
