const mongoose = require('mongoose');
const otpSchema =  mongoose.Schema;

const otpModel = new otpSchema({
   email: {
        type: String,
        unique: true,
        required: true,
    },
    otp: {
        type: String,
        required: true, 
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

const OTP = mongoose.model('OTP', otpModel);

module.exports = OTP;