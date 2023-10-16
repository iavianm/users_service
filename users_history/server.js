const express = require("express");
const bodyParser = require("body-parser");
const historyRoutes = require("./routes");
const { errors } = require("celebrate");
const cors = require("cors");

const app = express();
const PORT = 4002;

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(historyRoutes);

app.use(errors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
