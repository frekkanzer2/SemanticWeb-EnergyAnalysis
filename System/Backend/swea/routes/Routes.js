const express = require("express");
const router = express.Router();

const tryController = require("../controllers/try");

const homeController = require("../controllers/home");
const territoryController = require("../controllers/Territory");

router.get("/trytest", tryController.test);
router.get("/localTest", tryController.localOntology);

//home Routes
router.get("/allHomeCountryAndSources", homeController.allHomeCountryAndSources);
//Territory Routes
router.get("/allCountry", territoryController.allCountry);
router.get("/singleCountryInformations", territoryController.singleCountryInf);

module.exports = router;