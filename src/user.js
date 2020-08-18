const users=[]

const roomEntryOff=[]

const addUser= (id, name, room)=>{
    name=name.trim().toLowerCase()
    const ind= users.findIndex((user)=>{
        return user.room==room
   })
   if(ind != -1){
    const user={
        id,
        name,
        room,
        token:"O",
    }
    users.push(user)
   }
   else
   {
    const user={
        id,
        name,
        room,
        token:"X",
    } 
    users.push(user)
   }

}

const removeUser=(id)=>{
    const index= users.findIndex((user)=>{
         return user.id==id
    })
    if(index != -1)
       users.splice(index,1)

}

const getUser=(room)=>{
    const player= users.find((user)=>{
        return user.room==room
   })  
   if(player)
     return player.name
}

const usersInRoom=(room)=>{
    const players=users.filter((user)=> user.room==room)
    return players.length
}

const getToken=(id)=>{
    const player= users.find((user)=>{
        return user.id==id
   })  
   if(player)
     return player.token
}
const checkEntry=(room)=>{
    const data=roomEntryOff.filter((data)=> data==room)
    return data.length
}


const offEntry=(room)=>{
    roomEntryOff.push(room)
}
const onEntry=(room)=>{
    const index= roomEntryOff.findIndex((x)=>{
        return x==room
   })
   if(index != -1)
      roomEntryOff.splice(index,1)
}
module.exports={
    addUser,
    removeUser,
    getToken,
    getUser,
    usersInRoom,
    onEntry,
    offEntry,
    checkEntry
}