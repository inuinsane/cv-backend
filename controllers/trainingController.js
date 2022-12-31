import User from "../Models/UserModel.js";
import { trainingValidation } from "../Validations.js";

// Create new data
export const createTrainingData = async (req, res) => {
  const userId = req.params.userId;
  // input validation
  const { error } = trainingValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  //   check user availability
  const user = await User.findById(userId);
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data user tidak ditemukan" });

  // Saving data
  await user.trainings.push(req.body);
  await user.save();
  res.status(201).json({
    status: "success",
    message: "Perubahan berhasil disimpan",
    data: user.trainings,
  });
};

// Get training data by User ID
export const getTrainingById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user)
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
    });

  res.status(200).json({
    status: "success",
    data: user.trainings,
  });
};

// Update training data by data ID
export const updateTrainingById = async (req, res) => {
  const dataId = req.params.dataId;
  const user = await User.findOneAndUpdate(
    { "trainings._id": dataId },
    {
      // Harus update secara manual
      // Apabila update menggunakan req.body, old data akan terhapus
      // see more https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
      $set: {
        "trainings.$.trainingName": req.body.trainingName,
        "trainings.$.trainingVendor": req.body.trainingVendor,
        "trainings.$.trainingLocation": req.body.trainingLocation,
        "trainings.$.start": req.body.start,
        "trainings.$.end": req.body.end,
        "trainings.$.certificateNumber": req.body.certificateNumber,
        "trainings.$.certificateLink": req.body.certificateLink,
        "trainings.$.information": req.body.information,
      },
    }
  );
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  const updated = await User.findById(user._id);
  res.status(201).json({
    status: "success",
    message: "Perubahan berhasil disimpan",
    data: updated.trainings,
  });
};

// Delete training data by data ID
export const deleteTrainingById = async (req, res) => {
  const dataId = req.params.dataId;
  const data = await User.findOne({ "trainings._id": dataId });
  if (!data)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });
  const deleted = await data.trainings.pull({ _id: dataId });
  await data.save();

  res.status(201).json({
    status: "success",
    message: `Data dengan id ${req.params.dataId} berhasil dihapus`,
    data: deleted,
  });
};
