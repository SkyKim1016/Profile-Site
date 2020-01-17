const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')

const mainRouter = require('./routers/main')

require('dotenv').config() // .env file load 

const app = express();
const port = process.env.PORT;
const publicDirectoryPath = path.join(__dirname, '/public/')

app.use(express.static(publicDirectoryPath))
    .set('views', publicDirectoryPath) //Setup handlebars engine and views location
    .set('view engine', 'hbs')

hbs.registerPartials(publicDirectoryPath+'/partials')



//DB
// const client = new MongoClient(process.env.MongodbURL, { useNewUrlParser: true, });
// client.connect(err => {
// console.log(chalk.blue('MonoDB connected !'))
//     const collection = client.db("PortfolioSite").collection("GuestBook").find({}).toArray(function(err, result){
//         if(err) console.log(err);
//         console.log(`name : ${result[0].name} / message : ${result[0].message}`)
//     })
// //   console.log(collection);
//   client.close();
// });

mongoose.connect(process.env.MongodbURL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}).then( () => console.log(chalk.blue.bold('DB connectied!')))


app.use(express.json())
app.use(morgan('dev'))
app.use(mainRouter)

app.listen(port, () => {
    // Compose multiple styles using the chainable API
    console.log(chalk.blue.bold(`Server is running on port ${port}`));
})