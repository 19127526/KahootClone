import React, {useRef, useState} from 'react';

import {over} from "stompjs"
import SockJS from 'sockjs-client';

let stompClient=null

class SocketConfig{
   register=({presentationId})=>{
    let Sock=new SockJS("https://spring-heroku.herokuapp.com/ws");
    stompClient=over(Sock);

    stompClient.connect({},this.onConnected(presentationId),onError);
  }
  onConnected=(presentationId)=>{
    stompClient.subscribe(`/slide/${presentationId}/playing`,onPublicMessageReceived)
  }
}
const registerUser=({presentationId})=>{

  const register=()=>{
  let Sock=new SockJS("https://spring-heroku.herokuapp.com/ws");
  stompClient=over(Sock);

  stompClient.connect({},onConnected,onError);
  }


  const onPublicMessageReceived=(payload)=>{
    console.log(payload)
    let payloadData=JSON.parse(payload.body);
    console.log(payloadData)
  }
  const onError=(err)=>{
    console.log(err)
  }
}

export default registerUser