var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

//router區塊
var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");
var usersRouter = require("./routes/users");

//express
var app = express();

//資料庫連線預設讀取index.js
require("./connections");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

module.exports = app;
