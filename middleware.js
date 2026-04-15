const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const {listingSchema, reviewSchema} = require("./schema");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirect url only for get requests
    if (req.method === "GET") {
      req.session.redirectUrl = req.originalUrl;
    }
    req.flash("error", "you must be logged in!");
    res.redirect("/login");
    return;
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let foundListing = await Listing.findById(id);
  if (!foundListing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "Unauthorized Person detected!");
    return res.redirect(`/listings/${id}`);
  }
  next()
};

module.exports.validateListing = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ExpressError(400, "Req body is required");
  }
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }

  next();
};

module.exports.validateReview = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ExpressError(400, "review is required");
  }
  let {error} = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let {id,  reviewId } = req.params;
  let foundReview = await Review.findById(reviewId);
  if (!foundReview.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next()
};