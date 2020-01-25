const path = require('path');
const http = require('http'); //For Socket IO Chatting
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
const socketio= require('socket.io');
const Filter = require('bad-words');

const mainRouter = require('./routers/index')
const { generateMessage, generateLocationMessage } = require('./utils/messages')



require('dotenv').config() // .env file load 

const app = express();
const server = http.createServer(app)//For Socket IO Chatting
const io = socketio(server)

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '/public/')

let count = 0

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
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( () => console.log(chalk.blue.bold('DB connectied!')))


app.use(express.json())
app.use(morgan('dev'))
app.use(mainRouter)



// Server (emit) -> Client (receive) --ackowledgement --> server 
// Client (emit) -> server (receive) --ackowledgement --> client


io.on('connection', (socket) => {
    console.log(chalk.green.bold('New WebSocket connection'))

    // socket.emit('Message', generateMessage('Welcome!'))

    socket.broadcast.emit("Message", generateMessage(' A new user has joined') )

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!')
        }

        // Socket.emit = send to spectied connection
        // Io.emit Send to every connection 
        io.emit('Message',generateMessage(message)) 
        callback() //Calback to client which is chat.js to error argument
      
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}&output=embed`) )
        
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('Message', generateMessage('A user has left!'))
    })
})


server.listen(port, () => {
    // Compose multiple styles using the chainable API
    console.log(chalk.blue.bold(`Server is running on port ${port}`));
})