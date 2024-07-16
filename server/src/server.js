const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
