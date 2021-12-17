import express from "express";
import path from "path";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import uploadRoute from "./routes/uploadRoute";
import dotenv from "dotenv";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected!!");
});
const app = express();

app.use(bodyParser.json());
app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
  app.use(express.static(path.join(__dirname, "/../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

app.listen(config.PORT, () => {
  console.log("Server started at http://localhost:5000");
});
