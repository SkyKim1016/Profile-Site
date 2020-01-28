const mongoose = require('mongoose')
const validator = require('validator')

//For example
// mongoose.connect('mongodb:127.0.0.1:27017/dbname,', {
//     useNewUrlParser:true,
//      
// })

const ChatHistorySchema = mongoose.Schema(
{
    userName: {
        type: String,
        trim: true
    },
    userType: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        // default: false
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true
    },
    createdAt:{
        type: Date, 
        default: Date.now
    }
    
})


// module.exports = GuestBook
module.exports = mongoose.model("ChatHistory", ChatHistorySchema);