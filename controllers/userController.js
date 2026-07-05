import userModel from "../models/user.model.js";

export const userCreate = async (req, res) => {
  try {
    const { email, phone, name } = req.body;

    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const user = await userModel.create({ email, phone, name });
    return res.status(201).json({ user, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.params.email,
    });

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
