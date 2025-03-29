const express = require('express');
const router = express.Router();
const User = require("../models/User");

//store new users data in the database
router.route("/new").post((req,res) => {
    const user_name = req.body.user_name;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        user_name,
        full_name,
        email,
        password
    });

    newUser.save().then(() => {
        res.json("User registered successfully!");
    }).catch((err) => {
        console.log(err);
    })
});

router.put("/update/:id", (req,res) => {
    const _id = req.params.id;
    const user_name = req.body.user_name;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const password = req.body.password;

    const update = {
        user_name,
        full_name,
        email,
        password
    }

    User.updateOne({_id: _id}, update, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            res.json("User details updated successfully!");
            console.log("Updated Docs : ", docs);
        }
    });
});

//Delete a user from database
router.delete("/delete/:id", (req,res) => {
    User.deleteOne({_id: req.params.id})
        .then(() => {res.json("User deleted successfully!")})
        .catch(err => res.status(400).json('Error :'+err));
});

//Get a single record from the database by passing user ID
router.route("/:id").get((req,res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.json({user}))
        .catch(err => res.status(400).json('Error : '+err));
});

//Get a single record from the database by passing user name
router.route("/get/:username").get((req,res) => {
    User.findOne({user_name: req.params.username})
        .then(user => res.json({user}))
        .catch(err => res.status(400).json('Error : '+err));
});

//Currently don't use this
//Returns true if a user is available under given username or else returns false
router.route("/available/:username").get((req,res) => {
    User.find({user_name: req.params.username})
        .then((user) => {
            res.json(user);
        })
        .catch(err => res.status(400).json('Error : '+err));
})

// Login route (add this if not present)
router.post("/login", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name });
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }
    
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Signup route (update the existing one)
router.post("/signup", async (req, res) => {
  try {
    const { user_name, full_name, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ 
      $or: [
        { user_name },
        { email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.user_name === user_name ? 
          'Username already exists' : 
          'Email already exists'
      });
    }

    const newUser = new User({
      user_name,
      full_name, 
      email,
      password,
      role: 'user'
    });

    await newUser.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration successful!'
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      success: false, 
      message: err.message
    });
  }
});

module.exports = router;