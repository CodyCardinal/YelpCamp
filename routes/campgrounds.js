const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const errorSync = require("../utils/errorSync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

router
  .route("/")
  .get(errorSync(campgrounds.index))
  .post(isLoggedIn, validateCampground, errorSync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(errorSync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, errorSync(campgrounds.updateCampground))
  .delete(isLoggedIn, errorSync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, errorSync(campgrounds.renderEditForm));

module.exports = router;
