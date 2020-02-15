const express = require('express')
const GuestBook = require('../models/guestBook')
const router = new express.Router();
const chalk = require('chalk');

router.get('/', (req, res) => {

    res.render('index', {
        visitorCounter
    })

})

router.get('/users/:id', (req, res) => {
    res.send(req.params)
})



router.post('/writePost', async (req , res) => {

    console.log(chalk.cyanBright('req.body.name : ', JSON.stringify(req.body)))

    // await guestBookObject.save()
    //     .then( () => { res.status(201).send(guestBookObject) })
    //     .catch( (error) => { res.status(400).send(error) })
    try {
        const guestBookObject = new GuestBook(req.body)
        await guestBookObject.save()
        res.status(201).send(guestBookObject)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/guestBook/', async(req, res) => {
    const _id = req.params.id

    try{
        const guestBookObject = await GuestBook.find({}).sort({post_date: -1})
        guestBookObjectDatas = JSON.stringify(guestBookObject)
        
        console.log(chalk.blueBright(guestBookObjectDatas))

        res.render('guestBook', {
            guestBookObject : guestBookObject
            
        })
    }catch(e){
        res.status(500).send()
    }
    
  
})

router.patch('/updatePost/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email', 'message'] //Conditions for allowing udpdate field
    const isValidOperation = updates.every( (update) => allowUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send( {error : 'Invalid updates' })
    }

    try{
        const guestBook = await GuestBook.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
        console.log('completed update :', guestBook)
        if(!guestBook){
            return res.status(404).send()
        }

        res.send(guestBook);
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/deletePost/:id', async (req, res) => {
    try {
        const guestBook = await GuestBook.findByIdAndDelete(req.params.id)
        if(!guestBook){
            return res.status(404).send({ 'error' : 'No data' })
        }

        res.send(guestBook)
        
    }catch(e) {
        res.status(500).send(e)
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