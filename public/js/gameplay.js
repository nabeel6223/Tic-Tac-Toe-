const socket=io()


const turns=["1","1","1","1","1","1","1","1","1"]

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ]

var opponent
socket.on("opponent",(data)=>{
    opponent=data
    notAllowed()
    document.querySelector(".opponent").textContent=data
})
socket.on("opponent1",(data)=>{
    Allowed()
    opponent=data
    document.querySelector(".opponent").textContent=data
})




const notAllowed=()=>{
    var tile=document.querySelectorAll(".tile")
        document.querySelector(".turn").textContent="Its " + opponent + " 's turn"
        document.querySelector(".turn").style.backgroundColor="#F0DF87"
    for(var i=0;i<tile.length;i++)
      tile[i].style.pointerEvents="none"
}
const Allowed=()=>{
    var tile=document.querySelectorAll(".tile")
    document.querySelector(".turn").textContent="Its your turn"
    document.querySelector(".turn").style.backgroundColor="#4BCFFA"
    for(var i=0;i<tile.length;i++)
      tile[i].style.pointerEvents="auto"
}  
var token

const { name,room } =Qs.parse(location.search, {ignoreQueryPrefix : true})
notAllowed()
document.querySelector(".turn").textContent=""
document.querySelector(".turn").style.backgroundColor="#4BCFFA"
document.querySelector(".msg").textContent="Share the room code \"" + room + "\" with other player!"

socket.on("start",()=>{
    document.querySelector(".wait").textContent="Game is On!"
    document.querySelector(".msg").textContent=""
})
socket.on("play",()=>{
    Allowed()
})
document.querySelector(".room").textContent=room

socket.emit("join",{name, room})



socket.on("msg",(data)=>{
    console.log(data)
})

socket.on("token",(data)=>{
 token=data
 document.querySelector(".token").textContent=data
})
 


document.querySelector(".again").addEventListener("click",()=>{
    window.location.reload()
})
document.querySelector(".first").addEventListener("click",()=>{
    notAllowed()
    turns[0]=token
    document.querySelector(".first").style.pointerEvents="none";
    document.querySelector(".first").classList.remove("tile")
document.querySelector(".first").style.cursor="default"
    document.querySelector(".first").textContent=token
    socket.emit("turnPlayed",{
        block:".first",
        value:document.querySelector(".first").textContent
    })
    checkWonOrLose(token)
})
document.querySelector(".second").addEventListener("click",()=>{
    notAllowed()
    turns[1]=token
    document.querySelector(".second").style.pointerEvents="none";
    document.querySelector(".second").style.cursor="default"
    document.querySelector(".second").classList.remove("tile")
    document.querySelector(".second").textContent=token
    socket.emit("turnPlayed",{
        block:".second",
        value:document.querySelector(".second").textContent
    })
        checkWonOrLose(token)
})
document.querySelector(".third").addEventListener("click",()=>{
    notAllowed()
    turns[2]=token
    document.querySelector(".third").style.pointerEvents="none";
    document.querySelector(".third").style.cursor="default"
    document.querySelector(".third").classList.remove("tile")
    document.querySelector(".third").textContent=token
    socket.emit("turnPlayed",{
        block:".third",
        value:document.querySelector(".third").textContent
    })
    checkWonOrLose(token)
})
document.querySelector(".fourth").addEventListener("click",()=>{
    notAllowed()
    turns[3]=token
    document.querySelector(".fourth").style.pointerEvents="none";
    document.querySelector(".fourth").style.cursor="default"
    document.querySelector(".fourth").classList.remove("tile")
    document.querySelector(".fourth").textContent=token
    socket.emit("turnPlayed",{
        block:".fourth",
        value:document.querySelector(".fourth").textContent
    })
    checkWonOrLose(token)

})
document.querySelector(".fifth").addEventListener("click",()=>{
    notAllowed()
    turns[4]=token
    document.querySelector(".fifth").style.pointerEvents="none";
    document.querySelector(".fifth").style.cursor="default"
    document.querySelector(".fifth").classList.remove("tile")
    document.querySelector(".fifth").textContent=token
    socket.emit("turnPlayed",{
        block:".fifth",
        value:document.querySelector(".fifth").textContent
    })
    checkWonOrLose(token)
  
})
document.querySelector(".sixth").addEventListener("click",()=>{
    notAllowed()
    turns[5]=token
    document.querySelector(".sixth").style.pointerEvents="none";
    document.querySelector(".sixth").style.cursor="default"
    document.querySelector(".sixth").classList.remove("tile")
    document.querySelector(".sixth").textContent=token
    socket.emit("turnPlayed",{
        block:".sixth",
        value:document.querySelector(".sixth").textContent
    })
    checkWonOrLose(token)
    
})
document.querySelector(".seventh").addEventListener("click",()=>{
    notAllowed()
    turns[6]=token
    document.querySelector(".seventh").style.pointerEvents="none";
    document.querySelector(".seventh").style.cursor="default"
    document.querySelector(".seventh").classList.remove("tile")
    document.querySelector(".seventh").textContent=token
    socket.emit("turnPlayed",{
        block:".seventh",
        value:document.querySelector(".seventh").textContent
    })
    checkWonOrLose(token)
    
})
document.querySelector(".eighth").addEventListener("click",()=>{
    notAllowed()
    turns[7]=token
    document.querySelector(".eighth").style.pointerEvents="none";
    document.querySelector(".eighth").style.cursor="default"
    document.querySelector(".eighth").classList.remove("tile")
    document.querySelector(".eighth").textContent=token
    socket.emit("turnPlayed",{
        block:".eighth",
        value:document.querySelector(".eighth").textContent
    })
    checkWonOrLose(token)
    
})
document.querySelector(".ninth").addEventListener("click",()=>{
    notAllowed()
    turns[8]=token
    document.querySelector(".ninth").style.pointerEvents="none";
    document.querySelector(".ninth").style.cursor="default"
    document.querySelector(".ninth").classList.remove("tile")
    document.querySelector(".ninth").textContent=token
    socket.emit("turnPlayed",{
        block:".ninth",
        value:document.querySelector(".ninth").textContent
    })
    checkWonOrLose(token)
  
})
socket.on("makeChange",(turn)=>{
    if(turn.block==".first")
      turns[0]=turn.value
    else if(turn.block==".second")
    turns[1]=turn.value
    else if(turn.block==".third")
    turns[2]=turn.value
    else if(turn.block==".fourth")
    turns[3]=turn.value
    else if(turn.block==".fifth")
    turns[4]=turn.value
    else if(turn.block==".sixth")
    turns[5]=turn.value
    else if(turn.block==".seventh")
    turns[6]=turn.value
    else if(turn.block==".eighth")
    turns[7]=turn.value
    else if(turn.block==".ninth")
    turns[8]=turn.value

    Allowed()
    document.querySelector(turn.block).style.pointerEvents="none";
    document.querySelector(turn.block).style.cursor="default"
    document.querySelector(turn.block).classList.remove("tile")
    document.querySelector(turn.block).textContent=turn.value
    checkWonOrLose()
    
})

socket.on("oppLeft",()=>{
    notAllowed()
    document.querySelector(".wait").textContent=opponent + " left the room!"
    document.querySelector(".turn").textContent="You Won!"
    document.querySelector(".msg").textContent="Click 'Play Again' to rejoin the room OR go to 'Home Page'"
    document.querySelector(".turn").style.backgroundColor="#75DA8B"
    document.querySelector(".again").disabled=false
    document.querySelector(".again").style.cursor="default"
    socket.emit("over")
})

checkWonOrLose=(token)=>{
    var y=0;
    for(var j=0;j<8;j++){
        if(turns[winCombos[j][0]]==token && turns[winCombos[j][1]]==token && turns[winCombos[j][2]]==token)
          {
              y=1;
              notAllowed()
              document.querySelector(".wait").textContent=""
              document.querySelector(".turn").textContent="You Won!"
              document.querySelector(".msg").textContent="Click 'Play Again' to rejoin the room OR go to 'Home Page'"
              document.querySelector(".turn").style.backgroundColor="#75DA8B"
              document.querySelector(".again").disabled=false
              document.querySelector(".again").style.cursor="default"
              socket.emit("won")
              break;
          } 
    }
    if(y==0)
       checkifDraw()
}

socket.on("lose",()=>{
    notAllowed()
    document.querySelector(".wait").textContent=""
    document.querySelector(".turn").textContent="You lose!"
    document.querySelector(".msg").textContent="Click 'Play Again' to rejoin the room OR go to 'Home Page'"
    document.querySelector(".turn").style.backgroundColor="#FF362E"
    document.querySelector(".again").disabled=false
    document.querySelector(".again").style.cursor="default"
    socket.emit("over")
})


var checkifDraw=()=>{
    var count=0
for(var i=0;i<9;i++)
{
    if(turns[i]=="1")
      count++
}

if(count==0)
  {
    notAllowed()
    document.querySelector(".wait").textContent=""
    document.querySelector(".turn").textContent="Draw!"
    document.querySelector(".msg").textContent="Click 'Play Again' to rejoin the room OR go to 'Home Page'"
    document.querySelector(".turn").style.backgroundColor="#99AAAB"
    document.querySelector(".again").disabled=false
    document.querySelector(".again").style.cursor="default"
    socket.emit("over")
  }
}
