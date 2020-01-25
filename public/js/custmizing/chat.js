const socket = io()

//Elements 
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('#chatSend')
const $messageFormButton = $messageForm.querySelector('#fab_send')
const $sendLocationButton = document.querySelector('#fab_map')

const $messagesDiv = document.querySelector('#chat_converse')


socket.on('Message', (message) => {
    console.log(message)
    createdAt = moment(message.createdAt).format('(DD/MMM h:mm:ss a)')

    let html = `<span class="chat_msg_item chat_msg_item_user"> ${message.text} </span>
    <span class="chat_msg_item chat_msg_item_user_time"> ${createdAt} </span> `
    $messagesDiv.insertAdjacentHTML('beforeend', html)
})  

socket.on('locationMessage', (message) => {
    // url = JSON.stringify(url)
    console.log(message.url)

    createdAt = moment(message.createdAt).format('(DD/MMM h:mm:ss a)')

     const html = `<span class="chat_msg_item chat_msg_item_user_location"> <iframe src=${message.url} id='map' frameborder="0" style="border:0; width:150px !important; height:150px !important" allowfullscreen> </iframe> </span> 
     <span class="status2">${createdAt}</span>`
    $messagesDiv.insertAdjacentHTML('beforeend', html)
})




$messageFormInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault()

        $messageFormButton.setAttribute('disabled','disabled')

        //disable
        const message = document.querySelector('#chatSend').value
        // const message = e.target.element.message.value 

        socket.emit('sendMessage', message, (error) => {
            $messageFormButton.removeAttribute('disabled')
            $messageFormInput.value = ''
            $messageFormInput.focus()
            //enable 

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered !')
        })
    }
})


$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your brwoser');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition( (position)=> {
        // console.log(position)

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, ()=> {

            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared! ')
        })
    })
})
