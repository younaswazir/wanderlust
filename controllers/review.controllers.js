const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const Listing = require("../models/listing");


const createReview = wrapAsync(async (req, res) => {
    let {id} = req.params;
    // let {rating, comment} = req.body.review;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added Successfully!")
    res.redirect(`/listings/${listing._id}`);
});

const deleteReview = wrapAsync(async (req, res) => {
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfuly!")
    res.redirect(`/listings/${id}`);
})

module.exports = {
    createReview,
    deleteReview
}