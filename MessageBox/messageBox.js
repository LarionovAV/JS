const timeOfMessageLife = 3000

const MessagesContainer = document.createElement("div")     // Поле-контейнер для сообщений
MessagesContainer.classList.add("messages_container")
document.body.prepend(MessagesContainer)


function destroyMessage(element){
    element.classList.remove("opening")
    element.classList.add("closing")
    setTimeout(()=>MessagesContainer.removeChild(element), 2000)
}

const showMessage = function(messageType, messageTitle, messageText){
    const messageBox = document.createElement("div")
    let messType 
    switch (String(messageType).toLowerCase()) {
        case "success":
            messType = "success_message"
            break;
        case "error":
            messType = "error_message"
            break;
        case "warning":
            messType = "warning_message"
            break;
        default:
            throw new Error("Undefined message type! Valid types are 'success', 'error' and 'warning'")
    }
    messageBox.classList.add("message_box", messType)
    messageBox.insertAdjacentHTML(
        "afterbegin", 
        `<div class = "message_text">
        <div class="message_header">
            <div class="message_title">${messageTitle}</div>
            <div class="close_btn"> <b>X</b> </div>
        </div>
        <div class="message_body">
            <p>${messageText}</p>
        </div>`
    )
    messageBox
        .children[0]
        .children[0]
        .children[1]
        .addEventListener("click", ()=>{
            messageBox.classList.remove("opening")
            messageBox.classList.add("closing")
        }) 
    MessagesContainer.appendChild(messageBox)
    setTimeout(() => {messageBox.classList.add("opening")}, 100)

   
    setTimeout(()=>{
        destroyMessage(messageBox)
    }, timeOfMessageLife)
}

