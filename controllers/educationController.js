import User from "../Models/UserModel.js";
import { educationValidation } from "../Validations.js";

export const createNewEducation = async (req, res) => {
  // Input validation
  if (!req.body)
    return res.send(400).json({
      status: "error",
      message: "Input tidak boleh kosong",
    });
  const { error } = educationValidation(req.body);
  if (error) {
    console.log(error.details[0]);
    if (error.details[0].path.includes("schoolName"))
      return res.status(400).send("Nama sekolah tidak boleh kosong");
    if (error.details[0].path.includes("startYear"))
      return res.status(400).send("Tahun mulai pendidikan tidak boleh kosong");
  }

  const user = await User.findById(req.params.userId);
  // check data availability
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "User tidak ditemukan" });

  await user.educations.push(req.body);
  await user.save();

  res.status(201).json({
    status: "success",
    message: "Perubahan berhasil disimpan",
    data: user.educations,
  });
};
