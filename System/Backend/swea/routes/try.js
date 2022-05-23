const express = require("express");
const router = express.Router();

const tryController = require("../controllers/try");

router.get("/trytest", tryController.test);

module.exports = router;