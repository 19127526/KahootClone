import {Badge, Button, Col, Drawer, Empty, FloatButton, List, message, Select, Space, Tabs} from "antd";
import React, {useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useLocation, useParams} from "react-router-dom";
import {getChat, postAnswer} from "../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {SERVER_URL} from "../../configs/url";
import {MessageOutlined, QuestionCircleOutlined,UserOutlined} from "@ant-design/icons";
import {Avatar, ChatContainer, MainContainer, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import {closePresentation, nextSlide} from "../../apis/slide/slideAPI";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

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

let flag=0;
let stompClient = null
const PresentationCoOwner = () => {
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
    const location = useLocation()
    const [dataPresent, setDataPresent] = useState(location.state.slide);
    const [presentOpen, setPresentOpen] = useState(1);
    const [value, setValue] = useState(0);
    const {preId} = useParams();
    const dataProfile = useSelector(state => state.loginPage);
    const profile = dataProfile.profile
    const email = dataProfile.profile.email;
    const [unseenMessage, setUnseenMessage] = useState(0)
    const [defaultValue, setDefaultValue] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [messageValue, setMessageValue] = useState("");

    const[questionListBeforeSort,setQuestionListBeforeSort]=useState([])
    const [questionList,setQuestionList]=useState([]);
    const [questionInitList,setQuestionInitList]=useState([]);


    const [openChat, setOpenChat] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [isLoadingChat, setIsLoadingChat] = useState(0);
    const [offSetChat, setOffSetChat] = useState(20)
    const messageEndRef = useRef(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [messageInitList,setMessageInitList]=useState([]);
    const [isLoadingInitChat,setIsLoadingInitChat]=useState(false)
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
        const receivedValue = JSON.parse(payload?.body)
        if (receivedValue.action === "STOP_PRESENTATION") {
            setPresentOpen(0)
            return (<Empty description="This slide is end, close please"
                           style={{display: "flex", justifyContent: "center", alignItems: "center"}}/>)
        } else if (receivedValue.action === "CHAT") {
            const temp = messageInitList;
            temp.push(receivedValue);
            console.log("temp",temp)
            setMessageInitList(temp);
            setUnseenMessage(prevState => prevState + 1);
        } else {
            setDataPresent(receivedValue);
            setPresentOpen(1);
        }
    }

    const handleMarkAnswered=(e)=>{

    }
    const handleMessageBtn = (event) => {
        if (stompClient) {
            let chatMessage = {
                sender: email,
                mess: messageValue,
                presentId: preId,
            };
            stompClient.send("/chat/presentation", {}, JSON.stringify(chatMessage));
            /* setMessageList([...messageList,chatMessage]);*/
        }
    }


    const onConnected = () => {
        stompClient.subscribe(`/application/${preId}/presentation`, onMessageNextSlideReceived);

    }


    const onError = (err) => {

    }

    const handleKey = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                console.log("left")
                nextSlide({
                    presentationId: preId,
                    email: email,
                    groupId: location.state.groupId,
                    action: "PREVIOUS_SLIDE"
                }).then((response) => {
                    if (response.status === 400) {
                        messageApi.info('This is the first slide');
                    }
                })
                break;
            case "ArrowRight":
                nextSlide({
                    presentationId: preId,
                    email: email,
                    groupId: location.state.groupId,
                    action: "NEXT_SLIDE"
                }).then((response) => {
                    if (response.code === 400) {
                        messageApi.info('This is the last slide');
                    }
                })
                break;
            default:
        }
    }

    useEffect(() => {
        window.addEventListener('popstate', function myPop(event) {
            closePresentation({presentationId: preId, owner: email, groupId: location.state.groupId}).then((res) => {
                console.log(res)
                window.removeEventListener("popstate", myPop);
                window.removeEventListener("keydown", handleKey);
            })
        });
        window.addEventListener('keydown', handleKey);
    }, []);



    useEffect(()=>{
        const getListChat = async () => {
            await getChat({offset: 0, presentId: preId, size: 20})
              .then(res => {
                  setMessageInitList(res.data.reverse())
                  flag=1;
                  setIsLoadingInitChat(true)
                  if(res.data.length==0){
                      setIsLoadingChat(-1);
                  }
              })
              .catch(() => {
              })
        }
        getListChat()
    },[]);

    useEffect(()=>{
       if(isLoadingInitChat){
           registerUser();
       }
    },[isLoadingInitChat])


    const onChange = (e) => {
        setValue(e.target.value);
    };
    const addOption = async () => {
        await postAnswer({email: profile.email, question: dataPresent?.id, answer: value})
          .then((res => {
              console.log(res)
              if (res.status === 202) {
                  if (res.data === true) {
                      setPresentOpen(2)
                  } else {
                      Notification("Notification submit", "Host disable present, please waiting host", constraintNotification.NOTIFICATION_WARN)
                  }
              }
          }))
          .catch((err) => {
          })
    }

    if (presentOpen === 0) {
        return (<Empty description="Please wait owner present slide"
                       style={{display: "flex", justifyContent: "center", alignItems: "center"}}/>)
    }
    if (presentOpen === 2) {
        Notification("Notification submit", "You submit success", constraintNotification.NOTIFICATION_SUCCESS)
        return (<Empty description="You submit success"
                       style={{display: "flex", justifyContent: "center", alignItems: "center"}}/>)
    }

    if (defaultValue === true) {
        Notification("Notification submit", "You submitted", constraintNotification.NOTIFICATION_WARN)
    }


    const handleMessage = (e) => {
        setMessageValue(e)
    }

    const showDrawer = ({type}) => {
        type ? setOpenChat(true) : setOpenQuestion(true);
        setUnseenMessage(0)

    };
    const onClose = ({type}) => {
        type ? setOpenChat(false) : setOpenQuestion(false);
    };


    const onYReachStart = async () => {
        if (isLoadingChat == -1) {
            return;
        }
        if(flag==1){
            messageEndRef.current?.scrollIntoView({block: 'nearest'});
            flag=-1;
        }
        else if(flag!=1){
            setIsLoadingChat(1);
            /* Fake fetch from API */
            await getChat({offset: offSetChat, presentId: preId, size: 20})
              .then(res => {
                  const tempList=res.data.reverse();
                  const temp = tempList.concat(messageList);
                  console.log(res.data)
                  if(res.data.length==0){

                      setIsLoadingChat(-1);
                  }
                  else{
                      setIsLoadingChat(0);
                  }
                  setMessageList(temp);
                  const tempOffset=offSetChat+20
                  setOffSetChat(tempOffset);
              })
              .catch(() => {
                  setIsLoadingChat(0);
              })
        }

    };


    return (
      <div style={{backgroundColor: "white"}}>
          {contextHolder}
          {
              dataPresent.genreQuestion === "MULTI_CHOICES" ?
                <ChartPresentation selectedValue={dataPresent} width={"165vh"}/> :
                <SlidePresentation selectedValue={dataPresent}/>
          }


          <FloatButton.Group shape="circle" style={{right: 24}}>
              <Badge count={unseenMessage}><FloatButton icon={<MessageOutlined/>}
                                                        onClick={() => showDrawer({type: true})}
                                                        style={{marginBottom: 24}}/> </Badge>
              <Badge>
                  <FloatButton icon={<QuestionCircleOutlined/>} onClick={() => showDrawer({type: false})}/>
              </Badge>
          </FloatButton.Group>

          <Drawer title="Chat" placement="right" onClose={() => {
              onClose({type: true});
              setUnseenMessage(0)
          }} open={openChat}>

              <MainContainer>
                  <ChatContainer>
                      <MessageList  style={{height:"90%",
                          overflowY:"scroll",
                          display:"flex",
                          flexDirection:"column-reverse",}}
                                    autoScrollToBottomOnMount={true}
                                    autoScrollToBottom={true}
                                    loadingMore={isLoadingChat==0?false:isLoadingChat==1?true:false}
                        /*   onYReachStart={(e)=>{
                             loadMoreChat();
                             if(isLoadingFirstChat==true) {
                               const a=messageEndRef.current.offsetTop;
                               console.log(a);
                               if(a<1000) {
                                 messageEndRef.current?.scrollIntoView({block: 'nearest'})
                               }
                               else{
                                 console.log(messageStartRef?.current.offsetTop)
                                 messageStartRef?.current?.scrollIntoView({block: 'nearest'})
                                 /!* messageEndRef.current?.scrollIntoView({  block: 'nearest' ,inline:"center"})*!/
                               }
                             }
                           }}*/
                                    onYReachStart={onYReachStart}
                      >
                          {
                              messageList?.map((value) => {
                                  return (
                                    <Message model={{
                                        message: value.mess,
                                        /* sentTime: value.sentTime,*/
                                        sender: value.sender,
                                        direction: value.sender == email ? "outgoing" : "incoming",
                                        position: "single"
                                    }} >
                                        {value.sender !== email ?
                                          <Avatar src={value.sender} style={{background:"aqua",display:"flex",justifyContent:"center",alignItems:"center"}}>{email[0]}</Avatar> :

                                          <Avatar src={value.sender} style={{background:"antiquewhite",display:"flex",justifyContent:"center",alignItems:"center"}}>Me</Avatar>
                                        }
                                    </Message>
                                  );
                              })
                          }
                          {
                              messageInitList?.map((value) => {
                                  return (
                                    <Message model={{
                                        message: value.mess,
                                        /* sentTime: value.sentTime,*/
                                        sender: value.sender,
                                        direction: value.sender == email ? "outgoing" : "incoming",
                                        position: "single"
                                    }} >
                                        {value.sender !== email ?
                                          <Avatar src={value.sender} style={{background:"aqua",display:"flex",justifyContent:"center",alignItems:"center"}}>{email[0]}</Avatar> :

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

          <Drawer title="Question" placement="right"
                  extra={
                      <Select
                        showSearch
                        placeholder="Sort question"
                        optionFilterProp="children"
                        style={{
                            width:"120px"
                        }}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'Unanswer',
                                label: 'Unanswer',
                            },
                            {
                                value: 'Answered',
                                label: 'Answered',
                            },
                            {
                                value: 'Total vote',
                                label: 'Vote',
                            },
                            {
                                value: 'Time Asked',
                                label: 'Time',
                            },
                        ]}
                      />
                  }
                  onClose={() => onClose({type: false})} open={openQuestion}>
              <div style={{height: "96%", overflowY: "scroll"}}>
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
                                  <UserOutlined/>
                                  <text> 21</text>
                              </Col>
                          </Space>

                          <Button type="text" style={{color: "grey", padding: 0}} onClick={handleMarkAnswered}>
                              Mark as answered
                          </Button>

                      </List.Item>
                    )}
                  />
              </div>
          </Drawer>
      </div>

    )
}
export default PresentationCoOwner