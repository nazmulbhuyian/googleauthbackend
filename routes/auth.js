const router = require("express").Router();
const passport = require("passport");

// const CLIENT_URL = "https://googleauth-m57fx.ondigitalocean.app/";
const CLIENT_URL = "https://googleauthbackend-judrv.ondigitalocean.app/auth/login/failed";

router.get("/login/success", (req, res) => {
  // console.log(req?.user);
  if (req?.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req?.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  console.log(req?.user)
  if (req?.user) {
    // Set the email in a cookie
    res.cookie("userEmail", req.user.emails[0].value, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site cookie policy
    });
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
