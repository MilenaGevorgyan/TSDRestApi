const express = require('express');
const router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const User = require("../models/user");
const Device = require("../models/device");
const passport = require('passport');
require('../config/passport')(passport);


router.post('/:deviceId/:action', (req, res) => {
    let user = res.locals.users;
    let action = req.params.action;
    let deviceId = req.params.deviceId;
    console.log(res.locals.users);
    if (action === 'start' || 'stop' || 'restart') {
        Device.findOne({_id: deviceId},//check if device exist
            function (device) {
                if (device) { //if exist  query in db with $and Expression,  and select the documents that satisfy all the expressions in the array
                    User.findOne({$and: [{'_id':user.id},{'devices._id': deviceId}, {'devices.permissions': action}]}).exec()
                        .then(user => {
                            if (user) {
                                res.send(200, {success: true, msg: 'Action passed'});

                            } else {
                                res.send(400, {success: false, msg: "You haven't permission for this action"})
                            }
                        });
                } else {
                    return res.send(401, {message: 'Device Not found'});
                }
            })
    } else res.send(400, {msg: "please pass right action"});
});

module.exports = router;
