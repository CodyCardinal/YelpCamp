const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");

const errorSync = require("../utils/errorSync");

router.post("/", isLoggedIn, validateReview, errorSync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, errorSync(reviews.deleteReview));

module.exports = router;
