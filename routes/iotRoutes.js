const express = require("express");
const router = express.Router();
const iotController = require("../controllers/iotController");

router.post("/distance", iotController.postDistance);
router.get("/distance", iotController.getDistance);
router.post("/controlPump", iotController.controlPump);

module.exports = router;
