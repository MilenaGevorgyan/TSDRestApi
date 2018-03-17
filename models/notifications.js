let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let smsSchema = new Schema({
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
module.exports = mongoose.model('smsList', smsSchema);