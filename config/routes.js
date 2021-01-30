const router = require("express").Router();
const postsController = require("../controllers/posts.controller");
const miscController = require("../controllers/misc.controller");

// home
router.get("/", miscController.home);

// posts
router.get("/posts", postsController.list);
router.get("/posts/create", postsController.create);
router.post("/posts/create", postsController.doCreate);
router.get("/posts/:id/edit", postsController.edit);
router.post("/posts/:id/edit", postsController.doEdit);
router.get("/posts/:id/delete", postsController.delete);
router.post("/posts/:id/delete", postsController.doDelete);
router.get("/posts/:id", postsController.detail);

// users

module.exports = router;
