import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination, Navigation} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, {useContext, useEffect, useState} from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar
} from "@chatscope/chat-ui-kit-react";

import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import {UNSAFE_NavigationContext, useLocation, useNavigate, useParams} from "react-router-dom";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {closePresentation, getDetailSlide, nextSlide, startPresentation} from "../../apis/slide/slideAPI";
import {Drawer, FloatButton, Badge, Button, Col, Space, Tabs, List} from "antd";
import {MessageOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {useSelector} from "react-redux";
import {getPresentationDetail} from "../../apis/presentation/presentationAPI";
import LoadingExample from "../../components/loading/LoadingExample";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {SERVER_URL} from "../../configs/url";

let stompClient = null
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


const MainPresentation = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(false)

    const location = useLocation();
    const {id} = useParams()

    const [selectedValue, setSelectedValue] = useState(undefined)
    const [slideList, setListSlide] = useState([]);

    const presentId=location.state.firstSlide.presentationId;

    const [openChat, setOpenChat] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [unseenMessage, setUnseenMessage] = useState(0)
    const dataProfile = useSelector(state => state.loginPage);
    const [messageValue,setMessageValue]=useState("");
    const email = dataProfile.profile.email;
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
        {
            title: 'Ant Design Title 5',
        },
        {
            title: 'Ant Design Title 6',
        },
    ];


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
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }
    const onMessageNextSlideReceived = (payload) => {
        /*setReceived(JSON.parse(payload?.body))*/
        // console.log("slide",JSON.parse(payload?.body));
        console.log(slideList.length)
    }

    const onConnected=()=>{
        stompClient.subscribe(`/application/${id}/presentation`,onMessageNextSlideReceived);
    }
    const onError=(err)=>{
        console.log(err)
    }

    useEffect(() => {
        setLoading(true)
        window.addEventListener('popstate', function myPop(event) {
            if(location.state.type === "Private"){
                closePresentation({presentationId: id, owner: email, groupId: location.state.groupId}).then((res) => {
                    console.log(res)
                    window.removeEventListener("popstate", myPop);
                })
            }
        });
        getPresentationDetail({id: location.state.id, email: email}).then((res) => {
            setListSlide(res.data.slides)
            setLoading(false)
            setLoading1(true)
            getDetailSlide({id: res.data.slides[0].id}).then((res) => {
                setSelectedValue(res.data)
                setLoading1(false)
            })
        })
        registerUser()
    },[])


    const showDrawer = ({type}) => {
        type ? setOpenChat(true) : setOpenQuestion(true);
        setUnseenMessage(0)

    };
    const onClose = ({type}) => {
        type ? setOpenChat(false) : setOpenQuestion(false);
    };

    const sendMessage = ({text}) => {
        setMessageList([...messageList, {
            message: text,
            sentTime: "12 minutes ago",
            sender: {
                email: "trthanhson232",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Avatar_%282009_film%29_poster.jpg/220px-Avatar_%282009_film%29_poster.jpg"
            },
        }]);
        setUnseenMessage(unseenMessage + 1);
    }

    const registerUser = () => {
        let Sock = new SockJS(`http://localhost:8081/ws`);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected=()=>{
        stompClient.subscribe(`/application/${presentId}/presentation`,onMessageReceived);
        userJoin();
    }
    const userJoin=()=>{
        let chatMessage = {
            sender:email,
            presentId:presentId,
            status:"JOIN",
        };
        stompClient.send("/chat/presentation", {}, JSON.stringify(chatMessage));
    }
    const onMessageReceived = (payload) => {
        const data = JSON.parse(payload.body);
        console.log("Data",data)
    }
    const onError=(err)=>{
        console.log(err)
    }
    useEffect(()=>{
        registerUser();
    },[]);

    const handleMessageBtn=(event)=>{
        if (stompClient) {
            console.log("DSD")
            let chatMessage = {
                sender:email,
                mess:messageValue,
                presentId:presentId,
            };
            stompClient.send("/chat/presentation", {}, JSON.stringify(chatMessage));
            setMessageList([...messageList,chatMessage]);
        }
    }




    useEffect(() => {
       if(slideList.length !== 0){
           getDetailSlide({id: slideList[activeIndex].id}).then((res) => {
               setSelectedValue(res.data)
           })
       }
    }, [activeIndex])

    const onIndex = (e) => {
        setLoading1(true)
        console.log(location.state.id)
        if(location.state.groupId !== null || location.state.groupId !== undefined) {
            nextSlide({presentationId: location.state.id, email: email, groupId: location.state.groupId, action: activeIndex < e.activeIndex ? "NEXT_SLIDE" : "PREVIOUS_SLIDE"}).then((response) => {
                // console.log(response)
                setLoading1(false)
            })
        }
        setActiveIndex(e.activeIndex)
    }

    const handleMessage=(e)=>{
        setMessageValue(e);
    }






    return (
        <>
            <Swiper
                slidesPerView={1}
                autoHeight={false}
                setWrapperSize={false}
                initialSlide={activeIndex}
                centeredSlides={true}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    type: "bullets",
                }}
                navigation={false}
                onActiveIndexChange={onIndex}
                modules={[Keyboard, Pagination, Navigation]}
            >

                {
                    isLoading || slideList.length === 0 ? <LoadingComponent/> : <div>
                        {slideList.map((value) => {
                            return (<SwiperSlide style={{backgroundColor: "white"}}>
                                {loading1 ? <LoadingComponent/> : value.genreQuestion === "MULTI_CHOICES" ?
                                    <ChartPresentation selectedValue={selectedValue} width={"165vh"}/> :
                                    <SlidePresentation selectedValue={selectedValue}/>}
                            </SwiperSlide>)
                        })}
                    </div>
                }

            </Swiper>

            <FloatButton.Group shape="circle" style={{right: 24}}>
                <Badge count={unseenMessage}><FloatButton icon={<MessageOutlined/>}
                                                          onClick={() => showDrawer({type: true})}
                                                          style={{marginBottom: 24}}/> </Badge>
                <Badge>
                    <FloatButton icon={<QuestionCircleOutlined/>} onClick={() => showDrawer({type: false})}/>
                </Badge>
            </FloatButton.Group>

            <Drawer title="Chat" placement="right" onClose={() => onClose({type: true})} open={openChat}>

                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                            {
                                messageList.map((value) => {
                                    return (
                                        <Message model={{
                                            message: value.mess,
                                           /* sentTime: value.sentTime,*/
                                            sender: value.sender,
                                            direction: value.sender == "19127526@student.hcmus.edu.vn" ? "outgoing" : "incoming",
                                            position: "single"
                                        }}>
                                            {value.sender !== "19127526@student.hcmus.edu.vn" ?
                                                <Avatar src={value.sender.imageUrl} name="Eliot"/> : <div/>}
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
        </>
    );
}

export default MainPresentation