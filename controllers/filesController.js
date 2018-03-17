const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});

// router.get('/', function(req, res, next) {
//     res.render('./index.ejs');
// });

router.post('/', upload.any(), function (req, res, next) {
    /*req.files has the information regarding the file you are uploading...
    from the total information, i am just using the path and the imageName to store in the mongo collection(table)
    */
    let path = req.files[0].path;
    let imageName = req.files[0].originalname;
    let imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;
    //imagepath contains two objects, path and the imageName
    //we are passing two objects in the addImage method.. which is defined above..
    router.addImage(imagepath, function (err) {
    });
    res.status(200).json({success: true, msg: "Image uploaded successfully"});

});

router.getImages = function (callback, limit) {

    Image.find(callback).limit(limit);
};

router.getImageById = function (id, callback) {

    Image.findById(id, callback);
};

router.addImage = function (image, callback) {
    Image.create(image, callback);
};


module.exports = router;