import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUsersDetail = [];
    allUsers.forEach((user) => {
      allUsersDetail.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUsersDetail);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  console.log(req);
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User Unavailable");
  }
  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      {
        $set: { name: name, about: about, tags: tags },
      },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
