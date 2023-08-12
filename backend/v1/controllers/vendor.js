const Model = require("../../model");

module.exports.createVendor = async (req,res,next) => {
     try {
        let findVendor = await Model.Vendor.findOne({ contact: req.body.contact });
        if(findVendor){
            throw new Error("Vendor Already Exists");
        }else {
            const user = await Model.Vendor.create(req.body);
            await user.save();
            return res.status(200).json({ msg: "VENDOR REGISTER SUCCESSFULLY", user });
          }
     } catch (error) {
        return res.status(400).json({error : "VENDOR NOT CREATED"})
     }
}

module.exports.updateVendorbyId = async (req, res, next) => {
    try {
      let user = await Model.Vendor.findOneAndUpdate(
        { _id: req.body.id },
        req.body,
        { new: true }
      );
      return res.status(200).json({msg:"SUCCESSFULLY FETCHED", user});
    } catch (error) {
      return res.status(400).json({error : "Updation Failed"})
    }
  };
