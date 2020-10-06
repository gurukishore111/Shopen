const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const productRoutes = require("./routes/productroutes");
const userRoutes = require("./routes/userroutes");
const orderPoutes = require("./routes/orderroutes");
const uploadRoutes = require("./routes/uploadRoutes");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

dotenv.config();

app.use(express.json());
connectDb();

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderPoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
console.log(process.env.NODE_ENV);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode port on ${PORT}....`
  )
);
