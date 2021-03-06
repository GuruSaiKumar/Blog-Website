const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ---------------------- Mongoose DB connect ----------------------
// mongoose.connect('mongodb://localhost/dailyJournalDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// ---------------------- Mongoose DB schema ----------------------
// const postScheme = new mongoose.Schema({ title: String, content: String });
// const Post = mongoose.model('Post', postScheme);

const homeStartingContent = "";
// "Add '/compose' at the end of ☝🏻url to add a new post";
const aboutContent = "Hi! This Daily Journal was made by Guru Sai Kumar 🤓 ";
const contactContent = "Heya! Reach me at gurusaikumar2002@gmail.com";

let posts = [
  {
    title: "Example Post 1",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "Example Post 2",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "Example Post 3",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  }

];
// ---------------------- Home Route ----------------------
app.get("/", (req, res) => {
  //   Post.find({}, (e, foundPosts) => {
  res.render("home", { content: homeStartingContent, posts: posts });
  //   });
});

// ---------------------- About Route ----------------------
app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

// ---------------------- Contact Route ----------------------
app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});

// ---------------------- Compose Route ----------------------
app.get("/compose", (req, res) => {
  res.render("compose");
});

// ---------------------- Compose Post Route ----------------------
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  // const postName = _.lowerCase(req.params.postName);
  const postName = (req.params.postName);
  posts.forEach((post) => {
    if (post.title === postName) {
      res.render("post", post);
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
