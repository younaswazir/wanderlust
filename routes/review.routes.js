const express = require("express");
const router = express.Router({ mergeParams: true });

const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const reviewController = require("../controllers/review.controllers");

//POST: add review Route   
router.post("/", isLoggedIn, validateReview, reviewController.createReview);

//DELETE: delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;