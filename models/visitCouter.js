let mongoose = require('mongoose');

let visitCounterSchema = mongoose.Schema({
    name: {type:String, required:true},
    totalCount: {type:Number, required:true},
    todayCount: {type:Number},
    date:{type:String}
})

let visitCounter = mongoose.model('visitCounter', visitCounterSchema)
module.exports = visitCounter