const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/lr-mongo');

app.post("/register", async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "Token not provided" });

  jwt.verify(token.split(" ")[1], 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key');
          res.json({ token });
        } else {
          res.status(400).json("Incorrect Password");
        }
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json("Internal server error");
    });
});

app.get("/user", verifyToken, (req, res) => {
  const userId = req.user.userId;

  UserModel.findById(userId)
    .then(user => {
      res.json({
        name: user.name,
        email: user.email,
        // Add other details as needed
      });
    })
    .catch(err => res.json(err));
});

app.listen(5000, () => {
  console.log('Server has started!');
});
