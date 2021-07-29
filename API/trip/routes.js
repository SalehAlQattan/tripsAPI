/* Libraries */
const express = require("express");
const multer = require("multer");
/* Controllers */
const { tripFetch } = require("./controllers");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

/* Read Routes */
router.get("/", tripFetch);

module.exports = router;