const express = require("express");
const cors = require("cors");
const { router } = require("./src/routes/router");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: [
      "https://afraco-admin-app-5sl9b.ondigitalocean.app",
      "http://localhost:5173",
    ],
  })
);

app.use(router);

app.listen(3004, () => {
  console.log("app running at port 3004");
});
