const express = require('express')
const GuestBook = require('../models/guestBook')
const router = new express.Router();
const chalk = require('chalk');

router.get('/', (req, res) => res.render('index', {
    phone:'(+82) 010 - 5843 - 8814'
}))

router.get('/single', async(req, res) => {
    const guestBookObject = await GuestBook.find({})
    console.log(chalk.blue(guestBookObject))
    
    res.render('single', {
        phone:''
    })
})



router.post('/writePost', async (req , res) => {

    console.log(chalk.cyanBright('req.body.name : ', JSON.stringify(req.body)))

    const guestBookObject = new GuestBook(req.body)

    try {
        await guestBookObject.save()
        res.status(201).send(guestBookObject)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/datas', async (req, res) =>  {
    try{
        // await GuestBook.find(function (err, results){
        //     if (err) return console.error(chalk.red('Error message : , ',err));
        //     console.log('result is : ',results);
        //     res.send(results);
        // })


        // console.log('datas : ',chalk.greenBright(datas))
        const guestBookObject = await GuestBook.find({})
        res.send(guestBookObject);

    }catch(err){
        res.status(500).send(err)
    }    
})




//Does not exist page then 404 error page
router.get('*', (req, res) => res.render('404', {
   
}))

module.exports = router