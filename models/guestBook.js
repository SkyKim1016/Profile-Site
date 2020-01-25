const mongoose = require('mongoose')
const validator = require('validator')

//For example
// mongoose.connect('mongodb:127.0.0.1:27017/dbname,', {
//     useNewUrlParser:true,
//      
// })

const GuestBookSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        lowcase:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error(' Email is invalid')
        //     }
        // }
    },
    phone:{
        type: String,
        trim: true,
        required: false,
        //If this filed is number then could be validate filtering function such as below 
        //validate(value) {
            // if( value < 0 ){
            //     throw new Error ('value must be a postive number')
            // }
       // }
    },
    web_url:{
        type: String,
        trim: true,
        required: false
    },
    message: {
        type: String,
        // default: false
        required: true,
        trim: true
    },
    post_date:{
        type: Date, 
        default: Date.now
    }
    
})


// module.exports = GuestBook
module.exports = mongoose.model("GuestBook", GuestBookSchema);