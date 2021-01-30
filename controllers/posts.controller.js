const Post = require("../models/Post.model");
const User = require("../models/User.model");

module.exports.list = (req, res, next) => {
  Post.find(
    req.query.title
      ? {
          title: { $regex: req.query.title, $options: "i" },
        }
      : {}
  )
    .populate("user")
    .then((posts) => {
      res.render("posts/posts", { posts: posts, title: req.query.title });
    })
    .catch((e) => next(e));
};

module.exports.detail = (req, res, next) => {
  Post.findById(req.params.id)
    .populate("user")
    .then((post) => {
      res.render("posts/post", { ...post.toJSON(), delete: false });
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  res.render("posts/postForm");
};

module.exports.doCreate = (req, res, next) => {
  const post = req.body;
  if (post.tags) {
    post.tags = post.tags.split(",");
  }
  Post.create(post)
    .then((p) => res.render("posts/post", p))
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.render("posts/postForm", post);
    })
    .catch((e) => next(e));
};

module.exports.doEdit = (req, res, next) => {
  const post = req.body;
  if (post.tags) {
    post.tags = post.tags.split(",");
  }
  Post.findByIdAndUpdate(req.params.id, post, { new: true })
    .then((p) => res.render("posts/post", p))
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Post.findById(req.params.id)
    .then((p) => res.render("posts/post", { ...p.toJSON(), delete: true }))
    .catch((e) => next(e));
};

module.exports.doDelete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/posts"))
    .catch((e) => next(e));
};
