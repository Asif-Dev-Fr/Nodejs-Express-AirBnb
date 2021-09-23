const express = require("express");

const {addEstate} = require("../controllers/estates");
const {removeEstate} = require("../controllers/estates");
const {editEstate} = require("../controllers/estates");
const {updateEstate} = require("../controllers/estates");
const upload = require("../utils/multer-init")

const router = express.Router();

router.get("/add-estate", (req, res) => {
  res.render("estates/form-estate", {estate: false});
});

router.post("/add-estate", upload.array("photos", 5), addEstate);

router.get("/delete-estate/:id", removeEstate);

router.get("/edit-estate/:id", editEstate);
router.post("/update-estate/:id", updateEstate);




module.exports = router;