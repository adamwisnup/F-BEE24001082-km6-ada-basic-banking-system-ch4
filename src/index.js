const express = require("express");
const app = express();
const cors = require("cors");
const Routes = require("./routes/v1/routes");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
