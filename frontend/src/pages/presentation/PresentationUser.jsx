import {
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  FloatButton,
  List,
  Radio,
  Row,
  Space,
  Tabs,
  Typography
} from "antd";
import React, {useEffect, useMemo, useRef, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useParams} from "react-router-dom";
import {getChat, joinPresentation, postAnswer} from "../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {SERVER_URL} from "../../configs/url";
import {MessageOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Avatar,ChatContainer, MainContainer, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";


const tabBarContent = ({data}) => {
  return (
    <div style={{height: "100%", overflowY: "scroll"}}>
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <text style={{color: "blue", fontWeight: "bold"}}>John Hill</text>
            <Space size={"large"}>
              <text fontSize={10}>Ant Design, a design language for background applications, is refined by
                Ant UED Team
              </text>
              <Col>
                <MessageOutlined/>
                <text> 20</text>
              </Col>
            </Space>

            <Button type="text" style={{color: "grey", padding: 0}}>
              mark as answered
            </Button>

          </List.Item>
        )}
      />
    </div>
  );
}

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
  const email = dataProfile.profile.email;
  const [unseenMessage, setUnseenMessage] = useState(0)
  const [defaultValue,setDefaultValue]=useState(false);
  const [messageList,setMessageList]=useState([]);
  const [isConnected,setIsConnected]=useState(false)
  const [messageValue,setMessageValue]=useState("");
  const [openChat, setOpenChat] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingFirstChat, setIsLoadingFirstChat] = useState(false);
  const [offSetChat,setOffSetChat]=useState(10)
  const messageEndRef=useRef(null);


  const tabBars = [
    {
      label: `Unread questions`,
      key: 1,
      children: tabBarContent({data: data}),
    },

    {
      label: `Questions`,
      key: 2,
      children: tabBarContent({data: data}),
    }
  ]

  const registerUser = () => {
    let Sock = new SockJS(`${SERVER_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }
  const onMessageNextSlideReceived = (payload) => {
    /*setReceived(JSON.parse(payload?.body))*/
    console.log("slide",JSON.parse(payload?.body));
    // const data=JSON.parse(payload?.body);
    //
    // let isBoolean=false;
    // const result=data.answers.forEach((index)=>{
    //   index?.userAnswers.forEach(index2=>{
    //     if(index2.userr == profile.email) {
    //       isBoolean=true;
    //     }
    //   })
    //   if(isBoolean==true){
    //     setDefaultValue(true)
    //     return index
    //   }
    // })
    // if(isBoolean===false){
    //   setDefaultValue(false)
    // }
      const receivedValue = JSON.parse(payload?.body)
      if(receivedValue.action === "STOP_PRESENTATION") {
          setPresentOpen(0)
          return (<Empty description="This slide is end, close please" style={{display:"flex",justifyContent:"center",alignItems:"center"}}/>)
          // setIsEnd(true)
      }
      else if(receivedValue.action==="CHAT"){
        const temp=messageList;
        temp.push(receivedValue);
        setMessageList(temp);
        setUnseenMessage(prevState => prevState+1);
       /* if(email!=receivedValue.sender){
          setUnseenMessage(prevState => prevState+1);
        }*/

      }
      else {
          setDataPresent(JSON.parse(payload?.body));
          setPresentOpen(1);
      }
  }


  const handleMessageBtn=(event)=>{
    if (stompClient) {
      let chatMessage = {
        sender:email,
        mess:messageValue,
        presentId:preId,
      };
      stompClient.send("/chat/presentation", {}, JSON.stringify(chatMessage));
     /* setMessageList([...messageList,chatMessage]);*/
    }
  }



  const onConnected=()=>{
    stompClient.subscribe(`/application/${preId}/presentation`,onMessageNextSlideReceived);

  }


  const onError=(err)=>{

  }

  const loadMoreChat=()=>{
    setIsLoadingChat(true);
    if (isLoadingFirstChat == false) {
      const getListChat = async () => {
        await getChat({offset: 0, presentId: preId, size: 15})
          .then(res => {
            setMessageList(res.data.reverse());
            setIsLoadingFirstChat(true);
            if(res.data.length==0){
              setIsLoadingChat(false);
            }
            else{
              setIsLoadingChat(false);
            }

          })
          .catch(() => {
            setIsLoadingChat(false);
          })

        ;
      }
      getListChat()
    } else {
      const getListChat = async () => {
        await getChat({offset: offSetChat, presentId: preId, size: 15})
          .then(res => {
            const tempList=res.data.reverse();
            const temp = tempList.concat(messageList);
            if(res.data.length==0){

              setIsLoadingChat(false);
            }
            else{
              setIsLoadingChat(false);
            }
            setMessageList(temp);
            setOffSetChat(prevState => prevState+10);
          })
          .catch(() => {
            setIsLoadingChat(false);
          })
      }
      getListChat()
    }
  }

  useEffect(() => {
    loadMoreChat()
  }, []);

  useEffect(()=>{
    if(isLoadingFirstChat==true) {
      registerUser();
    }
  },[messageList]);




  useEffect(()=>{
    const getListOptionAndAnswer=async ()=>{
      await joinPresentation({preId:preId, email: profile.email, groupId: 2})
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

    // if(presentOpen===3){
    //     return (<Empty description="This presentation is ended" style={{display:"flex",justifyContent:"center",alignItems:"center"}}/>)
    // }
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


  const handleMessage=(e)=>{
    setMessageValue(e)
  }

  const showDrawer = ({type}) => {
    type ? setOpenChat(true) : setOpenQuestion(true);
    setUnseenMessage(0)

  };
  const onClose = ({type}) => {
    type ? setOpenChat(false) : setOpenQuestion(false);
  };



    return (
        <div style={{backgroundColor: "white", margin: "10%", padding: "5%"}}>
          {/*  {
                dataPresent.genreQuestion === "MULTI_CHOICES" ?  <>
                    <Space direction={"vertical"} align={"center"} style={{width: "100%", overflowY: "scroll"}}>
                        <Typography style={{fontSize: 40}}>
                            Question
                        </Typography>
                        <Typography style={{fontSize: 40, fontWeight: "bold",margin:"0 0 2% 0"}}>
                            {dataPresent.text}
                        </Typography>
                    </Space>
                    <Radio.Group onChange={onChange} value={value} style={{width: "100%"}}  defaultValue={defaultValue}>
                        {dataPresent.votes.map((item, index) => {
                            return (<Card
                                style={{marginLeft: "5%", marginRight: "5%", marginBottom: "1%", border: "solid"}}>
                                <Row>
                                    <Radio value={item.id === null || item.id === undefined ? item.voteText :item.text} key={item.id === null || item.id === undefined ? item.voteId : item.id } />
                                    <Typography>{item.id === null || item.id === undefined ? item.voteText :item.text}</Typography>
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
                    </Space></> : <SlidePresentation selectedValue={dataPresent}/>
            }*/}






          <FloatButton.Group shape="circle" style={{right: 24}}>
            <Badge count={unseenMessage}><FloatButton icon={<MessageOutlined/>}
                                                      onClick={() => showDrawer({type: true})}
                                                      style={{marginBottom: 24}}/> </Badge>
            <Badge>
              <FloatButton icon={<QuestionCircleOutlined/>} onClick={() => showDrawer({type: false})}/>
            </Badge>
          </FloatButton.Group>

          <Drawer title="Chat" placement="right" onClose={() => {onClose({type: true});setUnseenMessage(0)}} open={openChat}>

            <MainContainer>
              <ChatContainer>
                <MessageList  style={{height:"550px",
                  overflowY:"scroll",
                  display:"flex",
                  flexDirection:"column-reverse",}}
                              loading={isLoadingChat}
                              onScrollCapture={(e)=>{
                              }}
                              onYReachStart={(e)=>{
                                loadMoreChat();
                                if(isLoadingFirstChat==true) {
                                  const a=messageEndRef.current.offsetTop;
                                  console.log(a);
                                  if(a<800) {
                                    console.log(messageEndRef.current.offsetTop)
                                    messageEndRef.current?.scrollIntoView({block: 'nearest'})
                                  }
                                  else{
                                    console.log("dsdsd");
                                    messageEndRef.current?.scrollIntoView(a,a-100)
                                    /* messageEndRef.current?.scrollIntoView({  block: 'nearest' ,inline:"center"})*/
                                  }
                                }
                              }}>
                  {
                    messageList?.map((value) => {
                      return (
                        <Message model={{
                          message: value.mess,
                          /* sentTime: value.sentTime,*/
                          sender: value.sender,
                          direction: value.sender == email ? "outgoing" : "incoming",
                          position: "single"
                        }}>
                          {value.sender !== email ?
                            <Avatar src={value.sender} style={{background:"aqua",display:"flex",justifyContent:"center",alignItems:"center"}}>PT</Avatar> :

                            <Avatar src={value.sender} style={{background:"antiquewhite",display:"flex",justifyContent:"center",alignItems:"center"}}>Me</Avatar>
                          }
                        </Message>
                      );
                    })
                  }
                  <div ref={messageEndRef}/>

                </MessageList>
                <MessageInput attachButton={false} placeholder="Type message here" onChange={handleMessage}
                              onSend={handleMessageBtn}
                />
              </ChatContainer>
            </MainContainer>
          </Drawer>

          <Drawer title="Question" placement="right" onClose={() => onClose({type: false})} open={openQuestion}>
            <Tabs
              size={"large"}
              tabPosition={"bottom"}
              style={{height: "100%"}}
              items={tabBars}
            />
          </Drawer>
        </div>

    )
}
export default PresentationUser