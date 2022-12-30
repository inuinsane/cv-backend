import User from "../Models/UserModel.js";
import { educationValidation } from "../Validations.js";

// create Education Data
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

// get education data by ID
export const getEducationData = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user)
    return res.status(404).json({
      status: "error",
      message: "Data User tidak ditemukan",
    });

  if (user.educations.length < 1)
    return res.status(404).json({
      status: "error",
      message: "Data User tidak ditemukan",
    });

  res.status(404).json({
    status: "success",
    message: "Data ditemukan",
    data: user.educations,
  });
};

// update education data by ID
export const updateEducationData = async (req, res) => {
  const dataId = req.params.dataId;
  const selectedData = await User.findOneAndUpdate(
    {
      "educations._id": dataId,
    },
    {
      // Harus update secara manual
      // Apabila update menggunakan req.body, old data akan terhapus
      // see more https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
      $set: {
        "educations.$.schoolName": req.body.schoolName,
        "educations.$.startYear": req.body.startYear,
        "educations.$.endYear": req.body.endYear,
        "educations.$.major": req.body.major,
        "educations.$.information": req.body.information,
      },
    }
  );
  const updated = await User.findById(selectedData._id);
  res.status(201).json({
    status: "success",
    message: "Perubahan berhasil disimpan",
    data: updated.educations,
  });
};

// delete education data by ID
export const deleteEducationData = async (req, res) => {
  const dataId = req.params.dataId;
  const selected = await User.findOne({ "educations._id": dataId });
  if (!selected)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });
  const deleted = await selected.educations.pull({ _id: dataId });
  await selected.save();
  res.status(201).json({
    status: "success",
    message: `Data dengan id ${req.params.dataId} berhasil dihapus`,
    data: deleted,
  });
};
