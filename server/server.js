
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express = require("express");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const prepRoutes = require("./routes/prepRoutes");
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
connectDB();
app.use("/review", reviewRoutes);
app.use("/users", userRoutes);
app.use("/prep", prepRoutes);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});