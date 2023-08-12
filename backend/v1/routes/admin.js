const router = require("express").Router();
const Controller = require("../controllers");
const Auth = require("../../common/authenticate");
const Fileupload = require("../controllers/fileUpload");


router.post("/createAdmin", Controller.AdminController.createAdmin);
router.post("/login", Controller.AdminController.login);
router.get("/getUser",Auth.verifyAdmin, Controller.AdminController.getAdmin);
router.put(
  "/updateProfile",
  Auth.verifyAdmin,
  Controller.AdminController.updateAdminprofile
);
router.post("/createVendor",Auth.verifyAdmin,Controller.VendorController.createVendor);
router.put("/updateVendor",Auth.verifyAdmin,Controller.VendorController.updateVendorbyId);

router.put(
  "/updatePassword",
  Auth.verifyAdmin,
  Controller.AdminController.updatePassword
);

router.get(
  "/getAllAdmin",
  Auth.verifyAdmin,
  Controller.AdminController.getAllAdmin
);
router.get(
  "/getAdminbyId/:id",
  Auth.verifyAdmin,
  Controller.AdminController.getAdminbyId
);
router.post(
  "/updateAdminbyId",
  Auth.verifyAdmin,
  Controller.AdminController.updateAdminbyId
);

//Managing Vendors
router.get("/getAllVendors",Auth.verifyAdmin,Controller.AdminController.getAllVendors);

//Enquiry Handling
router.post("/CreateSupportEnquiry",Auth.verifyAdmin,Controller.AdminController.createSupportEnquiry);
router.get("/getAllEnquiry",Auth.verifyAdmin,Controller.AdminController.getAllEnquiries);


router.post("/upload",Fileupload.upload.single('image'),Controller.AdminController.testImage)

module.exports = router;