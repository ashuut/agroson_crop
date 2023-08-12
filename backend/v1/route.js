const router = require("express").Router();
const Routes = require("./routes");

router.use("/admin", Routes.AdminRoutes);
router.use("/vendor",Routes.VendorRoutes);

module.exports = router;