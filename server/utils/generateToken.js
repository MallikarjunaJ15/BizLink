import jwt from "jsonwebtoken";
export const generateToken = async (res, userId) => {
  try {
    const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
