require("dotenv").config();
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User.cjs");

const app = express();
app.use(cors());
app.use(express.json());

// --------------------------- MONGODB CONNECTION ---------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/heritageUsers")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// --------------------------- CAPTCHA VERIFY FUNCTION ---------------------------
async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET;

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );

  return response.data.success;
}


// --------------------------- SIGNUP ROUTE ---------------------------
app.post("/signup", async (req, res) => {
  const { name, passwd, email, mobileno, captcha } = req.body;

  try {
    // verify captcha
    const isValid = await verifyCaptcha(captcha);
    if (!isValid) {
      return res.json({ success: false, message: "CAPTCHA failed!" });
    }

    // check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already registered!" });
    }

    // create new user
    const user = await User.create({
      name,
      passwd,
      email,
      mobileno,
    });

    return res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error" });
  }
});


// --------------------------- LOGIN ROUTE ---------------------------
app.post("/login", async (req, res) => {
  const { name, passwd, captcha } = req.body;

  try {
    // verify captcha
    const isValid = await verifyCaptcha(captcha);
    if (!isValid) {
      return res.json({ success: false, message: "CAPTCHA failed!" });
    }

    // check user
    const user = await User.findOne({ name, passwd });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error" });
  }
});


// --------------------------- START SERVER ---------------------------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
