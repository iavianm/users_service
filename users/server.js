const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { errors } = require("celebrate");
const cors = require("cors");

const app = express();
const port = 4001;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use(routes);

app.use(errors());

const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = server;
