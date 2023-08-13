const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const errorSync = require("../utils/errorSync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

router.get("/", errorSync(campgrounds.index));
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router.post("/", isLoggedIn, validateCampground, errorSync(campgrounds.createCampground));
router.get("/:id", errorSync(campgrounds.showCampground));
router.get("/:id/edit", isLoggedIn, isAuthor, errorSync(campgrounds.renderEditForm));
router.put("/:id/", isLoggedIn, isAuthor, validateCampground, errorSync(campgrounds.updateCampground));
router.delete("/:id", isLoggedIn, errorSync(campgrounds.deleteCampground));

module.exports = router;
