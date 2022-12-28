import {
    Badge,
    Button,
    Col,
    Drawer,
    Empty,
    FloatButton,
    List,
    Space,
    Tabs,
    message
} from "antd";
import React, {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useLocation, useParams} from "react-router-dom";
import {postAnswer} from "../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {SERVER_URL} from "../../configs/url";
import {MessageOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Avatar,ChatContainer, MainContainer, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import {closePresentation, nextSlide} from "../../apis/slide/slideAPI";
import {NOTIFICATION_SUCCESS} from "../../components/notification/Notification.constraints";


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
    const [dataPresent,setDataPresent]=useState(location.state.slide);
    const [presentOpen,setPresentOpen]=useState(1);
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
    const [isLoadingMessage, setIsLoadingMessage] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

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
        console.log(receivedValue)
        if(receivedValue.action === "STOP_PRESENTATION") {
            setPresentOpen(0)
            return (<Empty description="This slide is end, close please" style={{display:"flex",justifyContent:"center",alignItems:"center"}}/>)
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
            setDataPresent(receivedValue);
            setPresentOpen(1);
        }
    }


    const handleMessageBtn=(event)=>{
        if (stompClient) {
            let chatMessage = {
                sender:email,
                mess:messageValue,
                presentId: preId, // gán cứng
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

    useEffect(()=>{
        window.addEventListener('popstate', function myPop(event) {
                closePresentation({presentationId: preId, owner: email, groupId: location.state.groupId}).then((res) => {
                    console.log(res)
                    window.removeEventListener("popstate", myPop);
                    window.removeEventListener("keydown", handleKey);
                })
        });
        window.addEventListener('keydown', handleKey);

        registerUser();
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

            <Drawer title="Chat" placement="right" onClose={() => {onClose({type: true});setUnseenMessage(0)}} open={openChat}>

                <MainContainer>
                    <ChatContainer>
                        <MessageList>
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
export default PresentationCoOwner