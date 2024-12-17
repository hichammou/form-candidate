import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  maritalStatus: String,
  expertiseDomain: String,
  yearsOfExperience: { type: Number, required: true },
  currentPosition: String,
  hobbies: String,
  mbaObjective: String,
  whyMba: String,
  contributionToTeam: String,
  profilePhoto: { type: String },
});

// Mongoose model for Candidate
export const Candidate = mongoose.model("Candidate", candidateSchema);
