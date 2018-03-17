let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    smsList :{
        type: String,
        required: true
    },
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: "Device",
            required: true
        }
    ]
});
module.exports = mongoose.model('User', UserSchema);