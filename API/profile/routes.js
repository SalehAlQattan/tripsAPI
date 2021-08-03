//library imports
const express = require("express");
const multer = require("multer");
const passport = require("passport");
//components
const { profileFetch, updateProfile, fetchProfile } = require("./controllers");

const router = express.Router();
router.param("userId", async (req, res, next, userId) => {
    const profile = await fetchProfile(userId, next)
    if (profile) {
        req.profile = profile;
        next()
    } else {
        const error = new Error("Profile Not Found");
        error.status = 404;
        next(error)
    }
})

const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage })

/* Middleware that handles fetching */

/* Read Routes */
router.get("/", profileFetch);

router.put("/:userId", passport.authenticate("jwt", { session: false }), upload.single("image"), updateProfile);

/* Todo: Update Profile */

module.exports = router;