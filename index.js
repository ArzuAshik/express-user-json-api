const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const usersRoutes = require("./routes/v1/users.route.js");

app.use(cors());
app.use(express.json());

// app.use(viewCount);

// Apply the rate limiting middleware to all requests
// app.use(limiter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("hlsdf");
})
app.use("/api/v1/users", usersRoutes);

app.all("*", (req, res) => {
  res.send("NO route found.");
});


// process.on("unhandledRejection", (error) => {
//   console.log(error.name, error.message);
//   app.close(() => {
//     process.exit(1);
//   });
// });
