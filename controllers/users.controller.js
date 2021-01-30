const User = require("../models/User.model");

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
    .populate({
      path: "posts",
      populate: {
        path: "user",
      },
    })
    .then((user) => res.render("users/user", user))
		.catch((e) => next(e));
};
