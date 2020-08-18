const socket=io()

const input=document.querySelector("input")
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault()
    document.querySelector('#send').setAttribute("disbaled","disabled")
    socket.emit("send",input.value,(message)=>{
        document.querySelector('#send').removeAttribute("disabled")
        console.log("The message was delivered!"+ message)
        input.value=""
        input.focus()
    })
})
const msgTemp=document.querySelector("#message-temp")
const messages=document.querySelector(".messages")
socket.on("msg",(data)=>{
  console.log(data.msg)
  messages.innerHTML+="<p>" + data.time + " - " + data.msg + "</p>"
})
socket.on("countUpdated",(count)=>{
    console.log("Count has been updated!" , count)
})
document.querySelector("#increament").addEventListener("click",()=>{
    console.log("clicked")
    socket.emit("increament")
})
document.querySelector("#location").addEventListener("click",()=>{
    document.querySelector("#location").setAttribute("disabled","disabled")
   if(!navigator.geolocation)
     return alert("Your browser doesn't support geolocation!")
   navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit("location",{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        },()=>{
        document.querySelector('#location').removeAttribute("disabled")
            console.log("Location Shared!")
        })
         
   })
})

