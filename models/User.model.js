const mongoose = require("mongoose");
const Post = require("./Post.model");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
