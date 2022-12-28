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
  //   },
  experiences: [
    {
      companyName: String,
      positionName: String,
      startYear: Number,
      endYear: {
        type: Number,
        defult: null,
      },
      information: String,
    },
  ],
});

export default mongoose.model("User", userSchema);
