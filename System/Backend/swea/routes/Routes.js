const express = require("express");
const router = express.Router();

const tryController = require("../controllers/try");
const territoryController = require("../controllers/Territory");

router.get("/trytest", tryController.test);
router.get("/localTest", tryController.localOntology);


//Territory Routes
router.get("/allCountry", territoryController.allCountry);
router.get("/singleCountryInformations", territoryController.singleCountryInf);

module.exports = router;