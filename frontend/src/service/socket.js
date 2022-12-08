import React, {useRef, useState} from 'react';

import {over} from "stompjs"
import SockJS from 'sockjs-client';

let stompClient=null

const SocketConFig=()=>{
  const [userData,setUserData]=useState({
    userName:"",
    receiverName:"",
    connected:false,
    message:""
  })
  const [publicChats,setPublicChats]=useState([]);

  const registerUser=()=>{
    let Sock=new SockJS("https://spring-heroku.herokuapp.com/ws");
    stompClient=over(Sock);
    stompClient.connect({},onConnected,onError);
  }


  const handleUserName=(e)=>{
    const value=e.target.value;
    console.log(value)
    setUserData({...userData,userName:value})
  }

  const onConnected=()=>{
    setUserData({...userData,connected:true});
    stompClient.subscribe(`slide/{keyPresentation}/playing`,onReceived);
    stompClient.subscribe("/chatroom/public",onPublicMessageReceived)
    stompClient.subscribe("/user/"+userData.userName+"private",onPrivateMessageReceived)
  }

  const onReceived=(payload)=>{

  }
  const onPublicMessageReceived=(payload)=>{
    let payloadData=JSON.parse(payload.body);
    switch (payloadData.status){
      case "JOIN":
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats])
        break;
    }
  }
  const onPrivateMessageReceived=(payload)=>{
    let payloadData=JSON.parse(payload.body);
    switch (payloadData.status){
      case "JOIN":
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats])
        break;
    }
  }
  const onError=(err)=>{
    console.log(err)
  }
  return registerUser()
}

export default SocketConFig