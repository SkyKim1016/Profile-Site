const socket = io()

//Elements 
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('#chatSend')
const $messageFormButton = $messageForm.querySelector('#fab_send')
const $sendLocationButton = document.querySelector('#fab_map')

const $messagesDiv = document.querySelector('#chat_converse')

$(document).ready(function(){
    let today = moment(new Date().getTime()).format('(DD/MMM h:mm:ss a)');
       $("#admin_today_time").html(today);
});

socket.on('Message', (datas) => {
    console.log('Client Message : ',datas)
    let html 
    createdAt = moment(datas.createdAt).format('(DD/MMM h:mm:ss a)')
    
    if(datas.userType === 'host'){
         html = `<span class="chat_msg_item chat_msg_item_admin">
                    <div class="chat_avatar">
                        <img src="images/personal.jpg" />
                    </div>${datas.message}
                 </span>
                 <span class="chat_msg_item chat_msg_item_admin_time"> ${createdAt} </span>`
    } else { 
         html = `<span class="chat_msg_item chat_msg_item_user"> ${datas.message} </span>
        <span class="chat_msg_item chat_msg_item_user_time"> ${createdAt} </span> `
    }
    $messagesDiv.insertAdjacentHTML('beforeend', html)
})  

socket.on('locationMessage', (message) => {
    // url = JSON.stringify(url)
    console.log(message.url)

    createdAt = moment(message.createdAt).format('(DD/MMM h:mm:ss a)')

     const html = `<span class="chat_msg_item chat_msg_item_user_location"> <iframe src=${message.url} id='map' frameborder="0" style="border:0; width:150px !important; height:150px !important" allowfullscreen> </iframe> </span> 
     <span class="status2">${createdAt}</span>`
    $messagesDiv.insertAdjacentHTML('beforeend', html)

    //Reply to User by Host
    setTimeout( () => {
       const host_html = `<span class="chat_msg_item chat_msg_item_admin">
                    <div class="chat_avatar">
                        <img src="images/personal.jpg" />
                    </div> Thank you for sharing your location.
                 </span>
                 <span class="chat_msg_item chat_msg_item_admin_time"> ${createdAt} </span>`
        $messagesDiv.insertAdjacentHTML('beforeend', host_html)         
      }, 5000);
})




$messageFormInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault()

        $messageFormButton.setAttribute('disabled','disabled')

        //disable
        let userName = 'Anonymous'
        const message = document.querySelector('#chatSend').value
        let userType = 'user' // This have to change as UserID ('Host or User) 

        // const message = e.target.element.message.value 

        socket.emit('sendMessage', { userName, message, userType } , (error) => {
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
    
    let userType = 'user'

    navigator.geolocation.getCurrentPosition( (position)=> {
        // console.log(position)

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            userType
        }, ()=> {

            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared! ')
        })
    })
})
