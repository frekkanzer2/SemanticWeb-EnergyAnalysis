const express = require("express");
const router = express.Router();

const tryController = require("../controllers/try");

router.get("/trytest", tryController.test);
router.get("/localTest", tryController.localOntology);
router.get("/allCountry", tryController.allCountry);

module.exports = router;