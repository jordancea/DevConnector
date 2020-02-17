const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const auth = require("./routes/api/auth");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

//Init Middleware

app.use(express.json({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/auth", auth);

const port = process.env.PORT || 5555;

process.env.SUPPRESS_NO_CONFIG_WARNING = 1;
process.env.NODE_APP_INSTANCE = "y";

app.listen(port, () => console.log(`Server running on port ${port}`));
