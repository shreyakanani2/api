const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const products = require("./routes/product");
const cors = require('cors');
const colors = require("colors");

//loads env var
dotenv.config({ path: "./config/config.env" });

//connect to DB
connectDB();

const app = express();


// Enable CORS
app.use(cors());

//body parse
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", products);

const PORT = process.env.PORT || 6000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
);
