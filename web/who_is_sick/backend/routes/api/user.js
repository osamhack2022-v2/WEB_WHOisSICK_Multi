const express = require('express');
const router = express.Router();
const { check , validationResult } = require('express-validator');
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
router.post('/',
[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please enter your email').isEmail(),
  check('password', 'Please enter a password').isLength({
    min:8,
  }),
],
async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const {name, email, password} = req.body;
  
  try{
    //유저 있는지 확인
    let user = await User.findOne( {email} );
    if (user) {
      return res.status(400).json({
        errors: [{
          msg: "User is already exist"
        }]
      })
    }
    //비밀번호 encrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // jsonwebtoken return 

    const payload = {
      user: {
        id: user.id,
      }
    }
    jwt.sign(payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if(err) throw err;
          res.json({
            token
          })
        }
        )
    res.send('user router');
  }catch (err) {
    console.error(err.message);
    res.status(500).send('sever error')
  }

  res.send('user router');
});




module.exports = router;