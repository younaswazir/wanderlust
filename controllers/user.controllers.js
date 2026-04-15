const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user")

const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

const signup = wrapAsync(async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    //req.login is a passport method that directly login user after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "user registered successfully!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
});

const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

const login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  // if(!redirectUrl){
  //   return res.redirect("/listings")
  // }
  res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
}

module.exports = {
  signup,
  renderSignupForm,
  renderLoginForm,
  login,
  logout
};
