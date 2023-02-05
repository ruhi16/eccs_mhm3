const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, lowercase: true},
    password: {type: String, required: true},
    panno: {type: String, required: true},
    access_token: {type: String},
    refresh_token: {type: String}, 
    
    verify_url: {type: String},
    is_url_verified: {type: Boolean, default: false},

    verify_otp: {type: String},
    is_otp_verified: {type: Boolean, default: false},


    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

});



userSchema.pre('save', async function(next) {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        
        next();
    }catch(error){
        next(error);
    }
});






const User = mongoose.model('User', userSchema);
module.exports = User;