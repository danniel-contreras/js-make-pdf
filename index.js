const express = require("express");
const cors = require("cors");
const { router } = require("./src/routes/router");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/reports", router);

app.listen(3004, () => {
  console.log("app running at port 3004");
});
