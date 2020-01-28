const generateMessage = (datas) => {
    
    datas.createdAt = new Date().getTime()
    console.log('Utility : ',datas)

    return{
        // message,
        // createdAt : new Date().getTime()
        datas
    }
}

const generateLocationMessage = (url) => {
    return{
        url,
        createdAt : new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}