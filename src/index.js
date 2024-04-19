const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Routes = require("./routes/v1/routes");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger
const file = fs.readFileSync(
  path.join(__dirname, "../docs/api-docs.yaml"),
  "utf8"
);
const swaggerDocument = YAML.parse(file);
app.use("/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1", Routes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
