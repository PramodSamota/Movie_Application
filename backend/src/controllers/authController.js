import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "user",
    });
    console.log("User registered:", user);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = await jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    console.log("accessToken", accessToken);

    const refreshToken = await jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();
    user.lastLogin = Date.now();

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken: oldRefreshToken } = req.body;
  console.log("oldRefreshToken", oldRefreshToken);
  if (!oldRefreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken: oldRefreshToken });
  console.log("refresAccessUser", user);
  if (!user) return res.sendStatus(403);
  console.log("user", user);
  const verified = jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!verified) return res.sendStatus(403);

  const newAccessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  cosole.log("newAccessToken", newAccessToken);
  const newRefreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

const logout = async (req, res) => {
  const refreshToken = req.header("Authorization").replace("Bearer ", "");
  const accessToken = req.header("Authorization").replace("Bearer ", "");
  await User.updateOne({ refreshToken }, { $set: { refreshToken: null } });

  res.status(200).json({ message: "Logged out" });
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getme = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { register, login, refreshAccessToken, logout, getAllUser, getme };
