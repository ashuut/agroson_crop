const Model = require("../../model");
const { Auth } = require("../../common/index");
const utility = require("../../common/utility");
const message = require("../../messages/en");
const sendMail = require("./sendMail");
const bcrypt = require("bcryptjs");


module.exports.createAdmin = async (req, res, next) => {
  try {
    let findAdmin = await Model.Admin.findOne({ email: req.body.email });
    if (findAdmin) {
      throw new Error("Email Already exists");
    } else {
      const user = await Model.Admin.create(req.body);
      await user.setPassword(req.body.password);
      await user.save();

      return res.status(200).json({ msg: "USER_REGISTER_SUCCESSFULLY", user });
    }
  } catch (error) {
    return res.status(400).json({error : "ADMIN NOT CREATED"})
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // await Validation.Admin.validateLogin(req);
    let adminData = await Model.Admin.findOne({
      email: req.body.email,
      isDeleted: false,
    }).lean();
    if (!adminData) {
      res.status(401).send({ message: "INVALID_EMAIL" });
      //throw new Error("");
    }
    if (adminData && adminData.isBlocked) {
      res.status(400).send({ message: "ADMIN_BLOCKED" });
    }

    //await adminData.authenticate(req.body.password);
    let match = await utility.comparePasswordUsingBcrypt(
      req.body.password,
      adminData.password
    );

    if (!match) {
      // throw message.INVALID_CREDENTAILS;
      res.status(400).send({ message: "INVALID_CREDENTAILS" });
    }
    let accessTokenGenerate = await Auth.getToken({
      _id: adminData._id,
      role: adminData.role,
    });
    adminData = await Model.Admin.findOneAndUpdate(
      { _id: adminData._id },
      { $set: { accessToken: accessTokenGenerate } },
      { new: true }
    );
    // await adminData.save();

    return res.status(200).json({ msg: "ADMIN_LOGIN_SUCCESSFULLY", adminData });
  } catch (error) {
    next(error);
  }
};
module.exports.getAdmin = async (req, res, next) => {
  try {
    let user = await Model.Admin.findOne({ _id: req.user._id });
    return res.status(200).json({ msg: "SUCCESSFULLY FETCHED", user });
  } catch (error) {
    return res.status(400).json({ error: "Error While Admin" });
  }
};

//admin
module.exports.getAllAdmin = async (req, res, next) => {
  try {
    let user = await Model.Admin.find({ isDeleted: false });
    return res.status(200).json({msg:"SUCCESSFULLY FETCHED", admins : user});
  } catch (error) {
    return res.status(400).json({msg:"ERROR WHILE GETTING ADMIN DATA"});
  }
};
module.exports.getAdminbyId = async (req, res, next) => {
  try {
    let user = await Model.Admin.findOne({ _id: req.params.id });
    return res.status(200).json({msg:"SUCCESSFULLY FETCHED", user});
  } catch (error) {
    return res.status(200).json({msg:"ERROR WHILE FETCHING ADMIN DATA"});
  }
};
module.exports.updateAdminbyId = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.location;
    }
    let user = await Model.Admin.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({msg:"SUCCESSFULLY UPDATED", user});
  } catch (error) {
    return res.status(400).json({msg:"NOT UPDATED"})
  }
};
module.exports.forgtpassword = async (req, res, next) => {
  try {
    let findmail = await Model.Admin.findOne({ email: req.body.email });
    if (findmail) {
      let forgotpasswordtoken = await Auth.getToken({
        _id: findmail._id,
        role: findmail.role,
      });
      let update = await Model.Admin.findOneAndUpdate(
        { email: req.body.email },
        { $set: { forgotpasswordtoken: forgotpasswordtoken } },
        { new: true }
      );

      return res.success("SUCCESSFULLY LINK SENT", update);
    } else {
      throw new Error("Email not exists");
    }
  } catch (error) {
    next(error);
  }
};
module.exports.forgtpasswordmail = async (req, res, next) => {
  try {
    await sendMail.sendforgotMail({ to: req.body.email, link: req.body.link });
    return res.success("SUCCESSFULLY LINK SENT");
  } catch (error) {
    next(error);
  }
};
module.exports.forgtpasswordpasswordChange = async (req, res, next) => {
  try {
    let password = await bcrypt.hash(req.body.password, 10);
    let updatemail = await Model.Admin.findOne({
      email: req.body.email,
      forgotpasswordtoken: req.body.forgotpasswordtoken,
    });
    if (updatemail) {
      let updatemail = await Model.Admin.findOneAndUpdate(
        {
          email: req.body.email,
          forgotpasswordtoken: req.body.forgotpasswordtoken,
        },
        { $set: { password: password } },
        { new: true }
      );
      let updatemail1 = await Model.Admin.findOneAndUpdate(
        {
          email: req.body.email,
          forgotpasswordtoken: req.body.forgotpasswordtoken,
        },
        { $set: { forgotpasswordtoken: "" } },
        { new: true }
      );
    } else {
      res.status(400).send({ message: "TOKEN EXPIRED" });
    }
    return res.success("SUCCESSFULLY UPDATED");
  } catch (error) {
    next(error);
  }
};


module.exports.updatePassword = async (req, res, next) => {
  try {
    let findUser = await Model.Admin.findOne({ _id: req.user._id });
    let match = await utility.comparePasswordUsingBcrypt(
      req.body.currentPassword,
      findUser.password
    );
    if (!match) {
      throw message.OLD_PASS_NOT_MATCH;
    }
    match = await utility.comparePasswordUsingBcrypt(
      req.body.newPassword,
      findUser.password
    );
    if (match) {
      throw message.OLD_PASS_IS_SAME_AS_NEW;
    }

    findUser = await Model.Admin.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          password: await utility.hashPasswordUsingBcrypt(req.body.newPassword),
        },
      }
    );
    return res.status(200).json({msg:"PASSWORD SUCCESFULLY CHANGED", user:findUser});
  } catch (error) {
    next(error);
  }
};
module.exports.updateAdminprofile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.location;
    }
    let updateProfile = await Model.Admin.findOneAndUpdate(
      { _id: req.user._id },
      req.body,
      { new: true }
    );
    return res.status(200).json({msg:"SUCCESSFULLY UPDATED", user : updateProfile});
  } catch (error) {
    next(error);
  }
};

module.exports.getAllVendors = async (req,res) => {
  try {
    let user = await Model.Vendor.find({});
    return res.status(200).json({msg:"SUCCESSFULLY FETCHED", vendors : user});
  } catch (error) {
    return res.status(400).json({msg:"ERROR WHILE GETTING VENDORS DATA"});
  }
}

module.exports.createSupportEnquiry = async (req,res) => {
  try {
    let Enquiry = await Model.Enquiry.create(req.body);
    await Enquiry.save();
    return res.status(200).json({msg:"Enquiry Added Successfully"});
  } catch (error) {
    return res.status(400).json({msg:"Enquiry Not Saved"});
  }
}

module.exports.getAllEnquiries = async (req,res) => {
  try {
    let AllEnquiries = await Model.Enquiry.find({});
    return res.status(200).json({msg:"ALL ENQUIRIES FETCHED",data : AllEnquiries})
  } catch (error) {
    return res.status(400).json({error:"No Enquiry"})
  }
}

module.exports.testImage = async (req,res) => {
  return res.status(200).json({msg:"successfull"});
} 