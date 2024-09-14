const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const MONGODB_URI =
  "mongodb+srv://tirthofficials:tsQzsG7z9M39ewtq@cluster0.iph3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Routes
const personalRoutes = require("./routes/personalRoutes.js");
const emergencyRoutes = require("./routes/emergencyRoutes.js");
const immunizationRoutes = require("./routes/immunizationRoutes.js");
const allergyRoutes = require("./routes/allergyRoutes.js");
const userRouter = require("./routes/userRouter.js");

app.use("/user-info", personalRoutes);
app.use("/emergency-contact", emergencyRoutes);
app.use("/immune-records", immunizationRoutes);
app.use("/allergy-history", allergyRoutes);
app.use("/user", userRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
