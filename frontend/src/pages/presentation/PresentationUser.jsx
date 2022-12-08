import {Avatar, Button, Card, List, Radio, Row, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";



let stompClient=null
const PresentationUser = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

  const [received,setReceived]=useState([]);
  const [userData,setUserData]=useState({
    userName:"",
    receiverName:"",
    connected:false,
    message:""
  });

  const [isConnected,setIsConnected]=useState(false)




  useEffect(()=>{
    const registerUser = () => {
      let Sock = new SockJS("https://spring-heroku.herokuapp.com/ws");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
      setIsConnected(true);
    }
    const onMessageReceived = (payload) => {
      setReceived(payload)
      console.log(payload)
      console.log("dsds",payload.data)
    }

    const onConnected=()=>{

      stompClient.subscribe(`/slide/29/playing`,onMessageReceived)
    }
    const onError=(err)=>{
      console.log(err)
    }

    registerUser();
  },[received])




    const [value, setValue] = useState(0);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


    return (
        <div style={{backgroundColor: "white", margin: "10%", padding: "5%"}}>
            <Space direction={"vertical"} align={"center"} style={{width: "100%", overflowY: "scroll"}}>
                <Typography style={{fontSize: 40}}>
                    ABCDEF
                </Typography>
                <Typography style={{fontSize: 40, fontWeight: "bold"}}>
                    ABCDEF
                </Typography>
            </Space>
            <Radio.Group onChange={onChange} value={value} style={{width: "100%"}}>
                {data.map((item, index) => {
                    return (<Card
                        style={{marginLeft: "5%", marginRight: "5%", marginBottom: "1%", border: "solid"}}>
                        <Row>
                            <Radio value={index}/>
                            <Typography>ABCDEFJKLASDJKLA</Typography>
                        </Row>
                    </Card>)
                })}

            </Radio.Group>
            <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
               <Row>
                   <Button >
                       Submit
                   </Button>
               </Row>
            </Space>
        </div>

    )
}
export default PresentationUser