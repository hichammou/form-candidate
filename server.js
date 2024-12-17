import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Candidate } from "./candidateModel.js";
import { upload } from "./multer.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Initialize express app
const app = express();
// Static files
app.use(
  cors({
    origin: process.env.ORIGINS.split(","),
    methods: "GET,POST",
  })
);

console.log(process.env.ORIGINS.split(","));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to parse JSON request body
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Mongoose schema for Candidate

// POST endpoint to store candidate data
app.post("/api/candidate", upload.single("profilePhoto"), async (req, res) => {
  try {
    const {
      name,
      age,
      maritalStatus,
      expertiseDomain,
      yearsOfExperience,
      currentPosition,
      hobbies,
      mbaObjective,
      whyMba,
      contributionToTeam,
    } = req.body;

    // Profile photo filename will be in req.file.filename
    const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;

    // Create a new candidate document
    const newCandidate = new Candidate({
      name,
      age,
      maritalStatus,
      expertiseDomain,
      yearsOfExperience,
      currentPosition,
      hobbies,
      mbaObjective,
      whyMba,
      contributionToTeam,
      profilePhoto,
    });

    // Save candidate to the database
    await newCandidate.save();
    res.status(201).json({
      message: "Candidate successfully added",
      candidate: newCandidate,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding candidate", error: error.message });
  }
});

// GET endpoint to retrieve all candidates
app.get("/api/candidates", async (req, res) => {
  if (true) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const candidates = await Candidate.find();
    return res.json(candidates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching candidates", error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
