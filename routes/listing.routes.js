const express = require("express");
const router = express.Router();
const listingControllers = require("../controllers/listing.controllers");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const multer = require("multer");
const { storage } = require("../config/cloud");

const MAX_IMAGE_SIZE = 1024 * 1024;
const upload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
});

const handleImageUpload = (renderOnError) => (req, res, next) => {
  upload.single("listing[image]")(req, res, async (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return renderOnError(req, res, "Image size should be 1 MB or lower.");
    }

    return next(err);
  });
};

// if req come through this path it will check for the verb and then trigger the one it matches
// verb means (get, post, put, delete)
router
  .route("/")
  .get(listingControllers.getAllListings) //get all listings
  .post(
    isLoggedIn,
    handleImageUpload((req, res, imageError) =>
      listingControllers.renderNewListingView(
        res,
        req.body.listing || {},
        imageError,
      ),
    ),
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
    handleImageUpload((req, res, imageError) =>
      listingControllers.renderEditListingView(
        req,
        res,
        req.body.listing || {},
        imageError,
      ),
    ),
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
