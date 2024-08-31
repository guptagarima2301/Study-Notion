const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator = require("otp-generator");


// sendotp
exports.sendOTP=async(req,res)=>{
    try{
    // fetch email
    const {email}=req.body;

    // check if user present
    const checkUserPresent=await User.findOne({email});

    // if exists
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:'user already registered',
        })
    }
// genearte otp
    var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });

    // unique otp

    const result=await OTP.findOne({otp:otp});
    while(result){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

       let result=await OTP.findOne({otp:otp});

    }

    const otpPayload={email,otp};
    // create an entry in db
    const otpBody=await OTP.create(otpPayload);
    console.log(otpBody);

    // return res
    res.status(200).json({
        success:true,
        message:'otp sent',
        otp,
    })


}

catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:error.message,

});
}

}


// signup
exports.signUp=async(req,res)=>{
    try{
        // data fetch from req body
        const {firstName,lastName,email,password,
        confirmPassword,otp,accountType,contactNumber}=req.body;

        // validate data


        // password match

        // check user exist

        // find most recent otp 

        // validate otp

        // hash pswd
        // entry in db
        // return response




    }
    catch(error){

    }
}



// login


// change password