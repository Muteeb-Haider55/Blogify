const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
require("dotenv").config();

const PORT = process.env.PORT;
const mongoURI = process.env.MONGOO_URI;

const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const Blog = require("./models/blog");
const app = express();

mongoose.connect(mongoURI).then(() => {
  console.log("MonoDB connected");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(PORT, () => {
  console.log(`Server is listen on port: ${PORT}`);
});
