import {Avatar, Button, Card, Empty, List, Radio, Row, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useParams} from "react-router-dom";
import {getListQuestionAndOptionByPreId} from "../../apis/presentation/presentationAPI";



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
    const [dataPresent,setDataPresent]=useState([]);

  const [received,setReceived]=useState([]);
  const [presentOpen,setPresentOpen]=useState(false);
  const [userData,setUserData]=useState({
    userName:"",
    receiverName:"",
    connected:false,
    message:""
  });
  const {preId}=useParams();

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
      console.log(payload);
    }

    const onConnected=()=>{
      stompClient.subscribe(`/slide/${preId}/playing`,onMessageReceived)
    }
    const onError=(err)=>{
      console.log(err)
    }

    registerUser();
  },[received]);

  useEffect(()=>{
    const getListOptionAndAnswer=async ()=>{
      await getListQuestionAndOptionByPreId({preId:preId})
        .then(res=>{
          if(res.response?.status===400){
            if(res.response.data.message.includes("presentation is stopped")){
              setPresentOpen(false);
            }
            if(res.response.data.message.includes("slide not found")){
              setPresentOpen(false);
            }
          }
          else{
            setDataPresent(res.data);
            setPresentOpen(true);
          }
          console.log(res)
        })
        .catch(err=>{console.log(err)})
    }
    getListOptionAndAnswer();
  },[]);
  console.log(dataPresent)
/*
  console.log([0].userAnswers)*/

  const onClick=()=>{
      if (stompClient) {
        var chatMessage ={
          answers: ["New option"],
          question: 201,
          email: "trthanhson232@gmail.com"
        };
        console.log(chatMessage);
        stompClient.send("/slide/play", {}, JSON.stringify(chatMessage));
      }
  }


  const chooseOptions=()=>{
  }

    const [value, setValue] = useState(0);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

  if(presentOpen===false){
    return (<Empty description="Please wait owner present slide"/>)
  }


    return (
        <div style={{backgroundColor: "white", margin: "10%", padding: "5%"}}>
            <Space direction={"vertical"} align={"center"} style={{width: "100%", overflowY: "scroll"}}>
                <Typography style={{fontSize: 40}}>
                    Question
                </Typography>
                <Typography style={{fontSize: 40, fontWeight: "bold",margin:"0 0 2% 0"}}>
                  {dataPresent.text}
                </Typography>
            </Space>
            <Radio.Group onChange={onChange} value={value} style={{width: "100%"}}>
                {dataPresent.answers.map((item, index) => {
                    return (<Card
                        style={{marginLeft: "5%", marginRight: "5%", marginBottom: "1%", border: "solid"}}>
                        <Row>
                            <Radio value={item.id} key={item.id}/>
                            <Typography>{item.text}</Typography>
                        </Row>
                    </Card>)
                })}

            </Radio.Group>
            <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
               <Row>
                   <Button onClick={onClick}>
                       Submit
                   </Button>
               </Row>
            </Space>
        </div>

    )
}
export default PresentationUser