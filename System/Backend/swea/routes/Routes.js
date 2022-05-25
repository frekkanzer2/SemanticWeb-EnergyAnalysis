const express = require("express");
const router = express.Router();

const tryController = require("../controllers/try");

const homeController = require("../controllers/home");
const territoryController = require("../controllers/Territory");
const sourcesController = require("../controllers/Sources");
const companyController = require("../controllers/Company");

router.get("/trytest", tryController.test);
router.get("/localTest", tryController.localOntology);

//home Routes
router.get("/allHomeCountryAndSources", homeController.allHomeCountryAndSources);

//Territory Routes
router.get("/allCountry", territoryController.allCountry);
router.get("/singleCountryInformations", territoryController.singleCountryInf);
router.get("/singleCountrySourcesRelated", territoryController.singleCountrySourcesRelated);
router.get("/singleCountryCriteriaRelated", territoryController.singleCountryCriteriaRelated);
router.get("/singleCountryCompaniesRelated", territoryController.singleCountryCompaniesRelated);

//Sources Routes
router.get("/allSources", sourcesController.allEnergySources);
router.get("/singleEnergyInformations", sourcesController.singleEnergyInf);
router.get("/singleSourceCountriesRelated", sourcesController.singleSourceCountriesRelated);
router.get("/singleSourceCriteriaRelated", sourcesController.singleSourceCriteriaRelated);

//Company Routes
router.get("/singleCompanyInformations", companyController.singleCompanyInformations);

module.exports = router;