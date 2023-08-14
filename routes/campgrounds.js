const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const errorSync = require('../utils/errorSync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(errorSync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, errorSync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(errorSync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, errorSync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, errorSync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, errorSync(campgrounds.renderEditForm))



module.exports = router;