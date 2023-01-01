import mongoose, { Schema } from "mongoose";

// Model for User Data
const userSchema = Schema({
  // biodata
  //   bio: {
  name: {
    type: String,
    required: true,
    min: 3,
    max: 256,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 256,
  },
  about: {
    type: String,
    max: 1024,
    default: "",
  },
  avatar: {
    type: String,
    max: 1024,
    default: "",
  },
  socialMedia: {
    website: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },

  password: {
    type: String,
    min: 6,
    max: 1024,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  rememberToken: {
    type: String,
    default: "",
  },

  // experiences
  experiences: [
    {
      companyName: String,
      positionName: String,
      start: {
        type: Date,
      },
      end: {
        type: Date,
        default: null,
      },
      information: String,
    },
  ],

  // educations
  educations: [
    {
      schoolName: String,
      startYear: Number,
      endYear: {
        type: Number,
        default: null,
      },
      major: String,
      information: String,
    },
  ],

  // trainings
  trainings: [
    {
      trainingName: { type: String, required: true },
      trainingVendor: { type: String, required: true },
      trainingLocation: { type: String, default: "" },
      start: { type: Date, required: true },
      end: { type: Date, default: null },
      certificateNumber: { type: String, default: "" },
      certificateLink: { type: String, default: "" },
      information: { type: String, default: "" },
    },
  ],

  // skills and certifications
  skills: [
    {
      skillName: String,
      score: String,
      certificateIssuer: String,
      certificateNumber: String,
      certificateLink: String,
      issuedDate: Date,
      expiredDate: { type: Date, default: null },
    },
  ],

  //
});

export default mongoose.model("User", userSchema);
