const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const products = require("./routes/product");
const auth = require("./routes/auth");
const cookierParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const path = require("path");
const colors = require("colors");
const errorHandler = require("./middleware/error");

//loads env var
dotenv.config({ path: "./config/config.env" });

//connect to DB
connectDB();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

// Enable CORS
app.use(cors(corsOptions));

//body parse
app.use(express.json());

//cookie parser

app.use(cookierParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// sanitize data
app.use(mongoSanitize());

// Use Helmet!
app.use(helmet());

//prevent xss attacks
app.use(xss());

//rate limit
const limit = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100,
});

app.use(limit);

//prevent http param pollution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", products);
app.use("/api/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
