const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const applicationController = require("./controllers/application");

const mongoConnect = require("./util/database").mongoConnect;

const app = express();

const User = require("./models/user");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5eee47f4205a5a48fbba134b")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(applicationController.pageNotFound);

mongoConnect(() => {
  app.listen(5000);
});
