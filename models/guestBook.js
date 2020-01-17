const mongoose = require('mongoose')
// const validator = require('validator')

const GuestBookSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true
    },
    phone:{
        type: String,
        trim: true
    },
    message: {
        type: String,
        // default: false
        required: true,
        trim: true
    },
    
})


// module.exports = GuestBook
module.exports = mongoose.model("GuestBook", GuestBookSchema);