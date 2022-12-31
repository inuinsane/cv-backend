import User from "../Models/UserModel.js";
import { experienceValidation } from "../Validations.js";

// create new data
export const createNewExperience = async (req, res) => {
  // input validation
  const { error } = experienceValidation(req.body);
  if (error) {
    console.log(error.details[0]);
    if (error.details[0].path.includes("companyName"))
      return res.status(400).send("Nama perusahaan tidak boleh kosong");
    if (error.details[0].path.includes("positionName"))
      return res.status(400).send("Jabatan tidak boleh kosong");
    if (error.details[0].path.includes("start"))
      return res.status(400).send("Tahun mulai pekerjaan tidak boleh kosong");
  }

  // check data availability
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  await user.experiences.push(req.body);
  await user.save();
  res.status(201).json({
    status: "success",
    message: "Perubahan berhasil disimpan",
    data: user.experiences,
  });
};

// get experiences data
export const getExperienceData = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({
      status: "error",
      message: "User tidak ditemukan",
    });

  res.status(200).json(user.experiences);
};

// update an experience data
export const updateExperienceData = async (req, res) => {
  const dataId = req.params.dataId;
  const selectedData = await User.findOneAndUpdate(
    { "experiences._id": dataId },
    {
      // Harus update secara manual
      // Apabila update menggunakan req.body, old data akan terhapus
      // see more https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
      $set: {
        "experiences.$.companyName": req.body.companyName,
        "experiences.$.positionName": req.body.positionName,
        "experiences.$.start": req.body.start,
        "experiences.$.end": req.body.end,
        "experiences.$.information": req.body.information,
      },
    }
  );
  if (!selectedData)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  const updated = await User.findById(selectedData._id);
  res.status(201).json({
    status: "success",
    message: "Perubahan berhasil disimpan",
    data: updated.experiences,
  });
};

// delete an experience data
export const deleteExperienceData = async (req, res) => {
  const data = await User.findOne({ "experiences._id": req.params.dataId });
  if (!data)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });
  const deleted = await data.experiences.pull({ _id: req.params.dataId });
  await data.save();
  res.status(201).json({
    status: "success",
    message: `Data dengan id ${req.params.dataId} berhasil dihapus`,
    data: deleted,
  });
};
