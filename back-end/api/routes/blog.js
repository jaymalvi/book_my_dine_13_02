const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/blog", blogController.allBlogPost);
router.post("/blog", blogController.addBlogPost);
router.delete("/blog/:blogId", blogController.deleteBlogPost);
router.put("/blog/:blogId", blogController.updateBlogPost);

module.exports = router;