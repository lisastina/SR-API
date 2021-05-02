const express = require("express");
const session = require("express-session");
const port = "3001";
const channelRoutes = require("./routes/channelRoutes");
const programRoutes = require("./routes/programRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const userRoutes = require("./routes/userRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

const app = express();
app.use(express.json());

app.use(session({
  secret: "The Phantom Menace",
  resave: false,
  sveUninitialized: true,
  cookie:  {secure: "auto"},
}));   

app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/schedule", scheduleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/favourite", favouriteRoutes);
 


app.listen(port, (err) => {
  if (err) {
    console.error("The server could not be started...");
    console.log(err);
    return;
  }
  console.log(`Listening on port ${port}`);
});