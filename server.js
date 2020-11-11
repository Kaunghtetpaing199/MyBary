if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");

const rootDir = path.dirname(process.mainModule.filename);

const indexrouter = require("./routes/routes");
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(rootDir, "views"));
app.set("layout", "layouts/layout");

app.use(expressLayout);
app.use(express.static(path.join(rootDir, "public")));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexrouter);
app.use("/authors", authorRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started at port ${port}`));
