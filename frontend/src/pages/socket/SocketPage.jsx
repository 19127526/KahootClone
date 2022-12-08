import {useState} from "react";
import {over} from "stompjs"
import SockJS from 'sockjs-client';
import {SERVER_URL} from "../../configs/url";
import publicGroupPage from "../group/public/PublicGroupPage";

let stompClient=null
const SocketPage=()=>{
  const [userData,setUserData]=useState({
    userName:"",
    receiverName:"",
    connected:false,
    message:""
  })
  const [publicChats,setPublicChats]=useState([]);
  const handleUserName=(e)=>{
    const value=e.target.value;
    console.log(value)
    setUserData({...userData,userName:value})
  }
  const registerUser=()=>{
    let Sock=new SockJS("https://spring-heroku.herokuapp.com/ws");
    stompClient=over(Sock);
    stompClient.connect({},onConnected,onError);
  }

  const onConnected=()=>{
    setUserData({...userData,connected:true});
    stompClient.subscribe(`/slide//playing`,onPublicMessageReceived)
    stompClient.subscribe("/user/"+userData.userName+"private",onPrivateMessageReceived)
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
  console.log(publicChats);
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
  return (
    <div className="container">
      {userData.connected?
        <div>Thành công</div>
        :
        <div className="register">
          <input id="userName" placeholder="Enter user name" defaultValue={userData.userName} onChange={handleUserName}/>
          <button onClick={registerUser}>Register</button>
        </div>
      }
    </div>
  )
}

export default SocketPage