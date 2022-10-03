const express = require('express');
const router = express.Router();
const { check , validationResult } = require('express-validator');

router.post('/',(req, res) => {
  console.log(req.body);
  res.send('user router');
});




module.exports = router;