const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const uploader = require('../../configs/cloudinary.config')
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;


// router.get("/login", (req, res, next) => {
//   res.render("auth/login", {
//     "message": req.flash("error")
//   });
// });

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

router.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    campus,
    course
  } = req.body;
  if (username === "" || password === "") {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (user) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      campus: campus,
      course: course,
    });

    newUser.save(err => {
      if (err) {
        res.status(400).json({
          message: 'Error saving user'
        });
        return;
      }
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Error login in after signup'
          });
          return;
        }
        res.status(200).json(newUser);
      })
    })
  });
});

router.put('/edit', (req, res, next) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, req.body)
  .then(() => {
    res.status(200).json({ message: `Todo ${id} updated` })
  })
  .catch(error => {
    res.status(500).json({ message:'Something went wrong' })
  })
})


router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({
    message: 'Log out success!'
  });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.post('/upload', uploader.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).json({
      secure_url: req.file.secure_url
    })
  } else {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
})
module.exports = router;