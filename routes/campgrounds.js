const express = require("express");
const router = express.Router();
const errorSync = require("../utils/errorSync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const Campground = require("../models/campground");

router.get(
  "/",
  errorSync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  errorSync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

router.get(
  "/:id",
  errorSync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: {
          path: "author"
        }
      }).populate("author");
    if (!campground) {
      req.flash("error", "Cannot find that campground!");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  errorSync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground!");
      return res.redirect("/campgrounds");
    }

    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id/",
  isLoggedIn,
  isAuthor,
  validateCampground,
  errorSync(async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "Successfully updated a campground!");
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  errorSync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted a campground!");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
