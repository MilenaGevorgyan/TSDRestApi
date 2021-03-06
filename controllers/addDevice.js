const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Device = require("../models/device");
const passport = require('passport');
require('../config/passport')(passport);

//we can add new .get endpoint to get all devices
router.get('/', function (req, res) {
    Device.find({}, function (err, devices) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(devices);
    });
});

//receive post request for adding Device
router.post('/', (req, res) => {
    let user = res.locals.users;
    let newDevice = new Device({
        ...req.body,
    });
    // User.findByIdAndUpdate(user.id, {$push: {devices: [newDevice]}}, {new: true}, function (err) {
    //     if (err) return (err);
    // });
    newDevice.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Save Device failed.'})
        }
        res.json(201, {success: true, msg: 'Successful created new Device.'})
    });
});

////receive Put request for Updating Device properties
router.put("/:deviceId", (req, res) => {
    let user = res.locals.users;
    if (user.role === 'admin') {
        Device.findOne({_id: req.params.deviceId},//find device in DB update devicetYpe, and addnig new user id
            function (err, device) {
                if (device) {
                    Device.findByIdAndUpdate(req.params.deviceId, {
                        deviceType: req.body.deviceType
                    }, {new: true}, function (err) {
                        if (err) res.send(err);
                        else res.json(200, {success: true, msg: 'Success'});
                    });
                } else {
                    return res.send(401, {message: 'Device Not found'});
                }
            })
    } else res.send(403, {success: false, msg: "You are not admin"})
});

////receive delete request for Delete Device
router.delete("/:deviceId", (req, res) => {
    let user = res.locals.users;
    if (user.role === 'admin') {
        Device.findOne({_id: req.params.deviceId},
            function (err, device) {
                if (device) {
                    Device.findByIdAndRemove(req.params.deviceId, function (err, data) {
                        if (err) res.send(err);

                        else res.send(200, {success: true, msg: 'Success'});
                    });
                } else {
                    return res.send(401, {message: 'Device Not found'});
                }
            })

    } else {
        res.send(401, {success: false, msg: 'You are not Admin'})
    }
});

module.exports = router;
