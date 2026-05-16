const GenerateOTP= async()=>{

    try {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    } catch (error) {
        throw new Error("Error generating OTP: " + error.message);
    }       
    
};

module.exports = GenerateOTP;