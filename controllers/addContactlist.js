const express = require('express');
const router = express.Router();
const User = require("../models/user");
const contactList = require("../models/contactList");
const passport = require('passport');
require('../config/passport')(passport);

//receive post request for adding Device
router.post('/:id', (req, res) => {

    let newContactList= new contactList({
        ...req.body,
        deviceId:req.params.id
    });
    // User.findByIdAndUpdate(user.id, {$push: {devices: [newDevice]}}, {new: true}, function (err) {
    //     if (err) return (err);
    // });
    newContactList.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Save newContactList failed.'})
        }
        res.json(201, {success: true, msg: 'Successful created new newContactList.'})
    });
});

router.get("/:id", (req, res) => {
    let user = res.locals.users;
    if (user.role === 'admin') {
        contactList.findOne({deviceId: req.params.deviceId},//find device in DB update devicetYpe, and addnig new user id
            function (err, contactList) {
                if (contactList) {
                    res.send(200, contactList);
                } else {
                    return res.send(401, {message: 'Contact List Not found'});
                }
            })
    } else res.send(403, {success: false, msg: "You are not admin"})
});

module.exports = router;
