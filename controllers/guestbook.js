

module.exports.collection = client.db("testDB").collection("testCollection").find({}).toArray(function(err, result){
    if(err) console.log(err);
    console.log(result)
})