import User from "../Models/UserModel.js";

// create Data
export const createSocialMedia = async (req, res) => {
  const userId = req.params.userId;
  const { website, instagram, linkedIn, facebook, twitter } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      "socialMedia.website": website,
      "socialMedia.instagram": instagram,
      "socialMedia.twitter": twitter,
      "socialMedia.facebook": facebook,
      "socialMedia.linkedIn": linkedIn,
    }
  );

  //   check user availability
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  const newData = await User.findById(userId);
  res.status(201).json({
    status: "success",
    message: "Data berhasil disimpan",
    data: newData.socialMedia,
  });
};

// Get data by user ID
export const getSocialMediaData = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  await user.save();
  res.status(201).json({
    status: "success",
    data: user.socialMedia,
  });
};

// Delete data by user ID
export const deleteSocialMedia = async (req, res) => {
  const userId = req.params.userId;
  const { website, instagram, linkedIn, facebook, twitter } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      "socialMedia.website": website,
      "socialMedia.instagram": instagram,
      "socialMedia.twitter": twitter,
      "socialMedia.facebook": facebook,
      "socialMedia.linkedIn": linkedIn,
    }
  );

  //   check user availability
  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "Data tidak ditemukan" });

  const newData = await User.findById(userId);
  res.status(201).json({
    status: "success",
    message: "Data berhasil dihapus",
    data: newData.socialMedia,
  });
};
