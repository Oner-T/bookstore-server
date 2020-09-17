const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

//user model
const User = require("../../models/User");

// @route POST api/users/signup
// @desc Register new client
// @access Public

router.post("/signup", (req, res) => {
  const { name, email, password, yetki, confirmPassword } = req.body;

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ general: "Lütfen tüm alanları doldurun" });
  }

  if (confirmPassword !== password) {
    return res.status(400).json({ password: "Şifreler uyumsuz!" });
  }

  //check existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ email: "Bu email ile kayıtlı bir kullanıcı bulunmakta" });

    const newUser = new User({
      name,
      email,
      password,
      yetki
    });

    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.yetki = 0;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

//@route POST api/users/login
//@desc Auth user
//@access Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ general: "Please fill all fields" });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({ email: "Client does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ password: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              sort: user.sort
            }
          });
        }
      );
    });
  });
});

//@route GET api/users/userid("_id" in the Mongodb)
//@desc Get user data
//@access Private
router.get("/:id", auth, (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.send("Please provide valid id");
  }
  var id = mongoose.Types.ObjectId(req.params.id);
  User.findById(id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
