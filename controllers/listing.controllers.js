const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

const buildOriginalImageUrl = (listing) => {
  if (!listing?.image?.url) return null;
  return listing.image.url.replace("/upload", "/upload/w_250");
};

const renderNewListingView = (res, formData = {}, imageError = null) => {
  res.status(400).render("./listings/new.ejs", { formData, imageError });
};

const renderEditListingView = async (
  req,
  res,
  formData = {},
  imageError = null,
  status = 400,
) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing does not exists");
    return res.redirect("/listings");
  }

  const originalImageUrl = buildOriginalImageUrl(listing);
  return res.status(status).render("./listings/edit.ejs", {
    listing,
    originalImageUrl,
    formData,
    imageError,
  });
};

//Get All Listings Controller
const getAllListings = wrapAsync(async (req, res) => {
  const { category, search } = req.query;
  let filter = {};
  if(category){
    filter.category = category;
  }
  if(search){
    filter.country = {$regex: search, $options: "i"};
  }
  const allListings = await Listing.find(filter);
  res.render("./listings/index.ejs", { allListings });
});

//Rendring form for creating new listing
const getNewListingForm = (req, res) => {
  res.render("./listings/new.ejs", { formData: {}, imageError: null });
};

//Create New Listing
const createNewListing = wrapAsync(async (req, res, next) => {
  const place = req.body.listing.location;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${place}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "my-listing-app",
    },
  });
  const data = await response.json();

  const lat = data[0].lat;
  const lon = data[0].lon;

  let Geocoordinates = { type: "Point", coordinates: [lat, lon] };

  let newListing = req.body.listing;
  newListing.owner = req.user._id;
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  newListing.geometry = Geocoordinates;
  await Listing.create(newListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
});

//See detail of a single listing OR show listing
const showListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exists");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
});

//Render Edit listing form
const getEditListingForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exists");
    return res.redirect("/listings");
  }
  let originalImageUrl = buildOriginalImageUrl(listing);
  res.render("./listings/edit.ejs", {
    listing,
    originalImageUrl,
    formData: {},
    imageError: null,
  });
});

//update listing
const updateListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = req.body.listing;
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  await Listing.findByIdAndUpdate(id, { ...listing });
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
});

//delete listing
const deleteListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
});

module.exports = {
  getAllListings,
  getNewListingForm,
  renderNewListingView,
  renderEditListingView,
  createNewListing,
  showListing,
  getEditListingForm,
  updateListing,
  deleteListing,
};
