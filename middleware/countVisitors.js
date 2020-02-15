let countVisitors = function(req, res, next){
    if(!req.cookies.count&& req.cookies['connect.sid']){
        req.cookie('count', "", { maxAge:3600000, httpOnly:true})
    }

    let now = new Date();
    let date = now.getFulYear() + "/" + now.getMonth() + "/" + now.getDate();

    if(date != req.cookies.countDate){
        res.cookie('countDate', date, {maxAge:86400000, httpOnly:true});

        let Counter = require('./models/visitCouter');


        Counter.findOne({name:"visitors"}, function (err,counter){
            if(err) return next();
            
            if(counter === null){
                Counter.create({name:"visitors",totalCount:1, todayCount:1, date:date});
            }else{
                Counter.totalCount++;
                if(Counter.date == date){
                    Counter.todayCount++;
                } else {
                    Counter.todayCount = 1;
                    Counter.date = date
                }
                Counter.save();
            }
        })


    
    } // End of If
}

module.exports = countVisitors;