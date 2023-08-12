const router = require("express").Router();
const Controller = require("../controllers");

router.post('/register',Controller.VendorController.createVendor);

module.exports = router;