const express = require("express");
const router = express.Router();
const listingControllers = require("../controllers/listing.controllers");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const multer = require("multer");
const { storage } = require("../config/cloud");
const upload = multer({ storage });

// if req come through this path it will check for the verb and then trigger the one it matches
// verb means (get, post, put, delete)
router
  .route("/")
  .get(listingControllers.getAllListings) //get all listings
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    listingControllers.createNewListing,
  ); //create listing

//New Route / render form for adding new listing
router.get("/new", isLoggedIn, listingControllers.getNewListingForm); //isLoggedIn is a middleware

router
  .route("/:id")
  .get(listingControllers.showListing)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    listingControllers.updateListing,
  )
  .delete(isLoggedIn, isOwner, listingControllers.deleteListing);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  listingControllers.getEditListingForm,
);

module.exports = router;
