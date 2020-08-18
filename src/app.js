const express=require("express");
const socketio=require("socket.io")
const path = require("path");
const app = express();
const moment=require("moment")
const http=require("http")
var url=require("url")
const {addUser, removeUser, getToken, getUser, usersInRoom, offEntry, onEntry, checkEntry}= require("./user")
const {check}=require("./checking")
const created=require("./created")
const port= process.env.PORT || 3000 ;


const publicDirPath= path.join(__dirname, "../public");
app.use(express.static(publicDirPath));
const server=http.createServer(app)
const io=socketio(server)
var count=0;
io.on("connection",(socket)=>{

  socket.on("join",({name, room})=>{
          
      const player1=getUser(room)
      if(player1)
         socket.emit("opponent",player1)
      socket.broadcast.to(room).emit("opponent1",name) 
      addUser(socket.id,name,room)
      socket.join(room)
      const token=getToken(socket.id)
      if(usersInRoom(room)==2)
      {
         io.emit("start")
         if(token=="O")
            socket.broadcast.to(room).emit("play")


      }
      socket.emit("token",token)
      socket.on("turnPlayed",(turn)=>{
        io.emit("setTimer")
        socket.broadcast.to(room).emit("makeChange",{
            block:turn.block,
            value:turn.value
        })
    })
      socket.broadcast.to(room).emit("msg","Hey!! New user.")
      socket.on("won",()=>{
        socket.broadcast.to(room).emit("lose")
        socket.leave(room)
        removeUser(socket.id)
        room=""
      })
      socket.on("over",()=>{
        socket.leave(room)
        removeUser(socket.id)
        room=""
      })
      socket.on("disconnect",()=>{
        socket.broadcast.to(room).emit("oppLeft")
        socket.leave(room)
        removeUser(socket.id)
 
  })





  })
})

 app.set("view engine","hbs");


app.get("",(req,res)=>{
    res.render("index")
})
app.get("/join",(req,res)=>{
    const room=req.query.room
    if(room)
       res.render("join-page",{
           error:"* Room is Full!"
       })
    else
      res.render("join-page")   
})
app.get("/gameplay",(req,res)=>{
    const {name, room}=req.query
    const players=usersInRoom(room)
    const isOk=check(players)
    if(isNaN(room) || !(room.length==5))
      res.redirect("/error")
    if(isOk && checkEntry(room)==0)
      res.render('gameplay')
    else
      res.redirect("/join?room=full")  
})

app.get("/cpu",(req,res)=>{
  const {prev}=req.query
  if(!prev)
    res.render("cpu-gameplay")
  else if(!(prev=="won" || prev=="lose"))
     res.redirect("/error")
  else   
    res.render("cpu-gameplay")
})
app.get("*",(req,res)=>{
  res.render("error")
})
 server.listen(port,()=>{
    console.log("Starting the server on port " + port);
})

