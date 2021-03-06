const express = require("express");
const morgan = require("morgan");
const expshbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");
const app = express();
require("./lib/passport");
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expshbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js"),
  })
);
app.set("view engine", ".hbs");
app.use(
  session({
    secret: "jackesecretmysqlsession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use(require("./routes/links"));
app.use(require("./routes/tasks"));
app.use(require("./routes/configuration"));
//Errors
app.use(function (req, res, next) {
  res.status(404).render("partials/404");
});
app.use(express.static(path.join(__dirname, "public")));
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
