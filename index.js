import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Appliation port
const port = process.env.PORT || 5050;
const db = process.env.DB;

// Running the app
const app = express();
app.listen(port, () => {
  console.log(`Server is up and running on port: http://localhost:${port}`);
});
app.use(express.json());

// Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;
dbConnection.on("err", (error) => {
  console.log(err);
});
dbConnection.once("open", () => {
  console.log("Connected to database...");
});

// import router
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users/", userRoutes);
