import './App.css';
import MainLayout from "./layouts/MainLayout";
import {useSelector} from "react-redux";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import Notification from "./components/notification/Notification";
import * as constraintNotification from "./components/notification/Notification.constraints";
import {notification} from "antd";
import {useNavigate} from "react-router-dom";
import {GROUP_JOINED_DETAIL} from "./configs/url";

let stompClient = null
function App() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const dataProfile = useSelector(state => state.loginPage);
  const registerUser = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }
  const onMessageReceived = (payload) => {
    const data = JSON.parse(payload.body)
    // console.log(data)
    api["info"]({
      message: 'Alert alert!!!',
      duration: 2.5,
      onClick: () => {
        navigate(GROUP_JOINED_DETAIL + `/${data.group}`)
      },
      description:
          'A presentation is being run right now, click here to check it out',
    });
  }
  const onConnected=()=>{
    stompClient.subscribe(`/application/${dataProfile.profile.id}/group`,onMessageReceived)
  }
  const onError=(err)=>{
    console.log(err)
  }

  if(dataProfile.isLogin) {
    registerUser()
  }

  return (
      <>
        {contextHolder}
        <MainLayout />
      </>

  );
}

export default App;
