import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { registerValidation } from "../Validations.js";

// Create new user data
export const createNewUser = async (req, res) => {
  // input validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // check email and username
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({
      status: "error",
      message: "Email sudah terdaftar, mohon gunakan email lain.",
    });
  const usernameExist = await User.findOne({
    username: req.body.username,
  });
  if (usernameExist)
    return res.status(400).send({
      status: "error",
      message: "Username sudah terdaftar, mohon gunakan username lain",
    });
  else {
    // create new user
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    });

    // save new user
    try {
      const savedUser = await newUser.save();
      savedUser.password = undefined;
      savedUser.rememberToken = undefined;
      res.status(201).json({
        status: "success",
        message: "Data berhasil disimpan",
        data: savedUser,
      });
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: "Mohon pastikan input sudah benar",
      });
    }
  }
};

// Get User Data by ID
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.password = undefined;
  user.rememberToken = undefined;

  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  res.status(200).json(user);
};

// Update User Data by ID
export const updateUserData = async (req, res) => {
  await User.findOneAndUpdate(req.params.id, req.body);
  const updatedData = await User.findById(req.params.id);
  updatedData.password = undefined;
  updatedData.rememberToken = undefined;

  res.status(201).json({
    status: "success",
    message: "Data berhasil disimpan",
    data: updatedData,
  });
};
