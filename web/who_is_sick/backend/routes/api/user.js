const express = require('express');
const router = express.Router();
const { check, validationResult } =require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/',[
    check('name', '이름을 입력하세요').not().isEmpty(),
    check('service_number', '군번을 입력하세요').isEmail(),
    check('password', '비밀번호를 입력하세요(8글자 이상)').isLength({
        min: 8,
    }),
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name,  service_number, password} =req.body;

    try {
        //유저가 존재하는지 체크
        let user = await User.findOne({service_number});// 군번이 이미 있으면 어떡함?
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: '이미 존재하는 사용자입니다.'
                }]
            });
        }
        //유저가 아바타 (프사)
        const avatar = gravatar.url(service_number, {
            s: '200',
            r: 'pg',
            d: 'mm',
        })
        user = new User({
            name,
            service_number,
            avatar,
            password,
        })
        //비밀번호 encrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // jsonwebtoken return 
        res.send('user router');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
    console.log(req.body);
    res.send('user router');
});

module.exports = router;