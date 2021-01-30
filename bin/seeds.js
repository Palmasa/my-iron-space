require("dotenv").config();
require("../config/db.config");
const faker = require("faker");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

Promise.all([Post.deleteMany(), User.deleteMany()]).then(() => {
  for (let i = 0; i < 10; i++) {
    User.create({
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      age: Math.ceil(Math.random() * 101) + 18,
    }).then((u) => {
      for (let i = 0; i < 10; i++) {
        Post.create({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(
            Math.floor(4 * Math.random()) + 1
          ),
          user: u._id,
          image: faker.image.image(),
          tags: getRandom(
            ["music", "politics", "cinema", "videogames"],
            Math.floor(Math.random() * 3) + 1
          ),
        }).then((p) => {
          console.log(`Created ${p.title} by ${p.user}`);
        });
      }
    });
  }
});

function getRandom(arr, n) {
  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
