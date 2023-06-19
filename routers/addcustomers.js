const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

// router.get(`/addcustomers`, (req, res)=> {

//   if(req.session.admin != undefined){
//     res.render('pages/addcustomers', {isadmin:req.session.admin});
//   }else{
//     res.status(404).render('pages/404');
//   }

// });

router.post('/', async (req, res) => {
    const firstnamevalue = req.body.inputs.firstname;
    const lastnamevalue = req.body.inputs.lastname;
    const passvalue = req.body.inputs.password;
    const confirmpassvalue = req.body.inputs.confirmpassword;
    const phonevalue = req.body.inputs.phone;
    const emailvalue = req.body.inputs.email;

    let c = 0;
    let Error = {
        firsterror: String,
        lasterror: String,
        emailerror: String,
        passerror: String,
        confirmpasserror: String,
        phoneerror: String,
    };

    console.log(req.body.inputs);

    if (firstnamevalue.trim() == '') {
        Error.firsterror = 'Please enter Firstname';
        c++;
    }

    if (lastnamevalue.trim() == '') {
        Error.lasterror = 'Please enter Lastname';
        c++;
    } else {
    }

    if (emailvalue == '') {
        Error.emailerror = 'Please enter Email';
        c++;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValid = emailPattern.test(req.body.inputs.email);
        if (isValid) {
        } else {
            Error.emailerror = 'Email is Invalid';
            c++;
        }
    }

    if (passvalue == '') {
        Error.passerror = 'Please enter Password';
        c++;
    } else {
        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        // Test the password against the pattern
        var isValid = passwordPattern.test(req.body.inputs.password);
        if (isValid) {
        } else {
            Error.passerror =
                'password must contain at least 8 characters,one lowercase letter,one uppercase letter and one digit';
            c++;
        }
    }
    if (confirmpassvalue == '') {
        Error.confirmpasserror = 'Please enter Confirm Password';
        c++;
    } else if (confirmpassvalue != passvalue) {
        Error.confirmpasserror = 'Please enter Matching Password';
        c++;
    } else if (confirmpassvalue == passvalue) {
    }
    if (phonevalue.length == 11 && !isNaN(phonevalue)) {
    } else {
        Error.phoneerror = 'Please enter right a phone number';
        c++;
    }
    console.log(Error);

    if (c == 0) {
        const user = {
            firstname: req.body.inputs.firstname,
            lastname: req.body.inputs.lastname,
            email: req.body.inputs.email,
            password: await bcrypt.hash(req.body.inputs.password, 12),
            phone: req.body.inputs.phone,
        };
        const users = new User(user);
        const check = User.findOne({ email: req.body.inputs.email })
            .then((result) => {
                if (result == undefined) {
                    users
                        .save()
                        .then((result) => {
                            res.send('done');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    Error.emailerror = 'existed email';
                    let err = {
                        firsterror: Error.firsterror,
                        lasterror: Error.lasterror,
                        emailerror: Error.emailerror,
                        passerror: Error.passerror,
                        confirmpasserror: Error.confirmpasserror,
                        phoneerror: Error.phoneerror,
                    };
                    res.send(err);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        let err = {
            firsterror: Error.firsterror,
            lasterror: Error.lasterror,
            emailerror: Error.emailerror,
            passerror: Error.passerror,
            confirmpasserror: Error.confirmpasserror,
            phoneerror: Error.phoneerror,
        };
        res.send(err);
    }
});

router.post('/checkemail', async (req, res) => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = emailPattern.test(req.body.email);
    if (isValid) {
        var query = { email: req.body.email };
        User.find(query)
            .then((result) => {
                if (result.length > 0) {
                    res.send('taken');
                } else {
                    res.send('available');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.send('wrong');
    }
});

module.exports = router;
