// Packages import
const flash = require('connect-flash');
const express = require("express");
const passport = require('passport');
const path = require('path');
const session = require("express-session")
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();

// Routes imports
const homepageRouter = require("./src/routes/home");
const estatesAdminRouter = require("./src/routes/estates-admin-router");
const usersRouter = require("./src/routes/users");
const apiRouter = require("./src/routes/api");
const estateRouter = require("./src/routes/estate");
const bookingRouter = require("./src/routes/booking");

// Constant
const PORT = 3000;

/**
 * ---------- VIEW ENGINE SETUP ----------
 */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/**
 * ---------- EXPRESS AND SESSION SETUP ----------
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  store: MongoStore.create({mongoUrl: process.env.CONNECTION_URL, collectionName: "sessions"})
}));
app.use(cookieParser());

/**
 * ---------- PASSEPORT AUTHENTICATION ----------
 */

// Pass the global passport object into the configuration function
app.use(passport.initialize());

/**
 * ---------- MONGOOSE CONNECTION ----------
 */
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(flash());

/**
 * ---------- ROUTES ----------
 */
app.use('/', homepageRouter);
app.use("/admin", estatesAdminRouter);
app.use("/estate", estateRouter);
app.use("/user", usersRouter);
app.use("/api", apiRouter);
app.use("/booking", bookingRouter);

/**
 * ---------- SERVER LISTENNING ----------
 */
app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT} address : http://localhost:${PORT}/`);
});
