import {Avatar, Button, Card, Empty, List, Radio, Row, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useParams} from "react-router-dom";
import {getListQuestionAndOptionByPreId, postAnswer} from "../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"


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
  const [presentOpen,setPresentOpen]=useState(0);
  const [value, setValue] = useState(0);
  const [userData,setUserData]=useState({
    userName:"",
    receiverName:"",
    connected:false,
    message:""
  });
  const {preId}=useParams();
  const dataProfile=useSelector(state=> state.loginPage);
  const profile=dataProfile.profile

  const [defaultValue,setDefaultValue]=useState(false);

  const [isConnected,setIsConnected]=useState(false)



  const registerUser = () => {
    let Sock = new SockJS("https://spring-heroku.herokuapp.com/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }
  const onMessageNextSlideReceived = (payload) => {
    /*setReceived(JSON.parse(payload?.body))*/
    console.log("slide",JSON.parse(payload?.body));
    const data=JSON.parse(payload?.body);

    let isBoolean=false;
    const result=data.answers.forEach((index)=>{
      index?.userAnswers.forEach(index2=>{
        if(index2.userr == profile.email) {
          isBoolean=true;
        }
      })
      if(isBoolean==true){
        setDefaultValue(true)
        return index
      }
    })
    if(isBoolean===false){
      setDefaultValue(false)
    }

    setDataPresent(JSON.parse(payload?.body));
    setPresentOpen(1);
  }


  const onMessageSubmitReceived = (payload) => {
    /*setReceived(JSON.parse(payload?.body))*/
    console.log("One",JSON.parse(payload?.body))
  }


  const onConnected=()=>{

    stompClient.subscribe(`/slide/${preId}/playing`,onMessageSubmitReceived);
    stompClient.subscribe(`/slide/${preId}/next`,onMessageNextSlideReceived)
  }
  const onError=(err)=>{

  }

  useEffect(()=>{
    registerUser();
  },[])


  useEffect(()=>{
    const getListOptionAndAnswer=async ()=>{
      await getListQuestionAndOptionByPreId({preId:preId})
        .then(res=>{
          if(res.response?.status===400){
            if(res.response.data.message.includes("presentation is stopped")){
              setPresentOpen(0);
            }
            if(res.response.data.message.includes("slide not found")){
              setPresentOpen(0);
            }
          }
          else{
            setDataPresent(res.data);
            setPresentOpen(1);
          }

        })
        .catch(err=>{console.log(err)})
    }
    getListOptionAndAnswer();
  },[]);





    const onChange = (e) => {
        setValue(e.target.value);
    };
    const addOption=async ()=>{
      await postAnswer({email:profile.email,question:dataPresent?.id,answer:value})
        .then((res=>{
          console.log(res)
          if(res.status===202) {
            if (res.data === true) {
                setPresentOpen(2)
            }
            else{
              Notification("Notification submit","Host disable present, please waiting host",constraintNotification.NOTIFICATION_WARN)
            }
          }
        }))
        .catch((err)=>{})
    }

  if(presentOpen===0){
    return (<Empty description="Please wait owner present slide" style={{display:"flex",justifyContent:"center",alignItems:"center"}}/>)
  }
  if(presentOpen===2){
    Notification("Notification submit","You submit success",constraintNotification.NOTIFICATION_SUCCESS)
    return (<Empty description="You submit success" style={{display:"flex",justifyContent:"center",alignItems:"center"}}/>)
  }

  if(defaultValue===true){
    Notification("Notification submit","You submitted",constraintNotification.NOTIFICATION_WARN)
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
            <Radio.Group onChange={onChange} value={value} style={{width: "100%"}}  defaultValue={defaultValue}>
                {dataPresent.answers.map((item, index) => {
                    return (<Card
                        style={{marginLeft: "5%", marginRight: "5%", marginBottom: "1%", border: "solid"}}>
                        <Row>
                            <Radio value={item.text} key={item.id} />
                            <Typography>{item.text}</Typography>
                        </Row>
                    </Card>)
                })}

            </Radio.Group>
            <Space direction={"vertical"} align={"center"} style={{width:"100%"}}>
               <Row>
                   <Button onClick={addOption} disabled={defaultValue===true?true:false}>
                       Submit
                   </Button>
               </Row>
            </Space>
        </div>

    )
}
export default PresentationUser