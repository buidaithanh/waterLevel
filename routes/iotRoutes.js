const express = require("express");
const router = express.Router();
const iotCotroller = require("../controllers/iotController");

router.post("/distance", iotCotroller.postDistance);
router.get("/distance", iotCotroller.getDistance);
router.post("/controlPump", iotController.controlPump);

module.exports = router;
