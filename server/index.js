const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ClientModel = require("./models/client");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://suuuuuu:fIWYaLmJEpFkR2CK@clustersuuuuu.g43qjwo.mongodb.net/client"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) =>
    console.error("Failed to connect to MongoDB. Is it running?", err)
  );

/* ===================== REGISTER ===================== */
app.post("/register", async (req, res) => {
  try {
    // Check if email already exists
    const exist = await ClientModel.findOne({ email: req.body.email });
    if (exist) {
      // ❌ Return error if already registered
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Create new user
    const client = await ClientModel.create(req.body);
    res.json({ message: "Registration successful", client });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

/* ===================== LOGIN ===================== */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await ClientModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password" });

    // ❌ SINGLE LOGIN CHECK
    //if (user.isLoggedIn) {
    //  return res.status(403).json({ message: "This email is already logged in" });
    // u.g;pg8 }

    // ✅ Mark user as logged in
    user.isLoggedIn = true;
    await user.save();

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ===================== LOGOUT ===================== */
app.post("/logout", async (req, res) => {
  const { userId } = req.body;
  try {
    await ClientModel.findByIdAndUpdate(userId, { isLoggedIn: false });
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ===================== GET ALL USERS ===================== */
app.get("/users", async (req, res) => {
  try {
    const users = await ClientModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ===================== DELETE USER ===================== */
app.delete("/user/:id", async (req, res) => {
  try {
    await ClientModel.findByIdAndDelete(req.params.id);
    res.json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ===================== UPDATE USER ===================== */
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await ClientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ===================== GET SINGLE USER ===================== */
app.get("/users/:id", async (req, res) => {
  try {
    const user = await ClientModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ===================== SERVER START ===================== */
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
