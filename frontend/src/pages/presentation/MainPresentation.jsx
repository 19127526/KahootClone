import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination, Navigation} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useEffect, useState} from "react";
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
import {useLocation, useParams} from "react-router-dom";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {closePresentation, nextSlide, startPresentation} from "../../apis/slide/slideAPI";
import {Drawer, FloatButton, Badge, Button, Col, Space, Tabs, List} from "antd";
import {MessageOutlined, QuestionCircleOutlined} from "@ant-design/icons";

let stompClient=null
const tabBarContent = ({data}) => {
    return (
       <div style={{height:"100%", overflowY:"scroll"}}>
           <List
               itemLayout="vertical"
               dataSource={data}
               renderItem={(item) => (
                   <List.Item >
                       <text style={{color: "blue", fontWeight: "bold"}}>John Hill</text>
                       <Space size={"large"}>
                           <text fontSize={10}>Ant Design, a design language for background applications, is refined by Ant UED Team</text>
                           <Col >
                               <MessageOutlined/>
                               <text> 20</text>
                           </Col>
                       </Space>

                       <Button type="text" style={{color:"grey", padding: 0}}>
                           mark as answered
                       </Button>

                   </List.Item>
               )}
           />
       </div>
    );
}




const MainPresentation = () => {
    const [activeIndex,setActiveIndex] = useState(0)
    const location=useLocation();
    const {id} = useParams()
    const [slideList,setListSlide]=useState(location.state.index);

    const [openChat, setOpenChat] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);

    const [messageList, setMessageList] = useState([]);
    const [unseenMessage, setUnseenMessage] = useState(0)

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

    const showDrawer = ({type}) => {
        type ? setOpenChat(true) : setOpenQuestion(true);
        setUnseenMessage(0)

    };
    const onClose = ({type}) => {
        type ? setOpenChat(false) : setOpenQuestion(false);
    };

    const sendMessage = ({text}) => {
        setMessageList([...messageList,{
            message: text,
            sentTime: "12 minutes ago",
            sender: {
                email: "trthanhson232",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Avatar_%282009_film%29_poster.jpg/220px-Avatar_%282009_film%29_poster.jpg"
            },

        }]);
        setUnseenMessage(unseenMessage + 1);
    }


    useEffect(()=>{
        const registerUser = () => {
            let Sock = new SockJS("https://spring-heroku.herokuapp.com/ws");
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        }
        const onMessageReceived = (payload) => {
            const data = JSON.parse(payload.body)
            const list=slideList?.map(index=>{
                if(index.id===data.id){
                    return data
                }
                return index
            })

            setListSlide(list);

            console.log("list",list)


        }
        const onConnected=()=>{
            stompClient.subscribe(`/slide/${id}/playing`,onMessageReceived)
        }
        const onError=(err)=>{
            console.log(err)
        }
        const startPresent = () => {
            console.log(location.state.firstSlide)
            startPresentation({presentationId: id, slideId: location.state.firstSlide}).then((response) => {
                // setListSlide(response.data["questions"])
            })
        }
        registerUser();
        startPresent();
    },[]);

    window.addEventListener('popstate', function(event) {
        closePresentation({presentationId: id}).then((res) => {

        })
    });

    const onIndex=(e)=>{
        setActiveIndex(e.activeIndex)
        nextSlide({slideId: slideList[e.activeIndex]?.id}).then((response) => {
        })
    }


    return (
      <>
          <Swiper
            slidesPerView={1}
            autoHeight={true}
            // setWrapperSize={true}
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
              {slideList.map((value, index) => {
                  return (<SwiperSlide style={{backgroundColor: "white", height:"100%", padding: "5%"}}  >
                      {<ChartPresentation value={value} width={"165vh"}/>}
                  </SwiperSlide>)
              })}
          </Swiper>

          <FloatButton.Group shape="circle" style={{ right: 24}}>
              <Badge count={unseenMessage}><FloatButton icon={<MessageOutlined/>} onClick={() => showDrawer({type: true})} style={{marginBottom:24}}/> </Badge>
             <Badge>
                 <FloatButton icon={<QuestionCircleOutlined />} onClick={() => showDrawer({type: false})}/>
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
                                          message: value.message,
                                          sentTime: value.sentTime,
                                          sender: value.sender.name,
                                          direction: value.sender.email === "trthanhson232" ? "outgoing" : "incoming",
                                          position: "single"
                                      }}>
                                          { value.sender.email !== "trthanhson232" ? <Avatar src={value.sender.imageUrl} name="Eliot" /> : <div/>}
                                      </Message>
                                  );
                              })
                          }

                      </MessageList>
                      <MessageInput attachButton={false} placeholder="Type message here" onSend={(textContent) => sendMessage({text: textContent})}
                      />
                  </ChatContainer>
              </MainContainer>
          </Drawer>

          <Drawer title="Question" placement="right" onClose={() => onClose({type: false})} open={openQuestion} >
              <Tabs
                  size = {"large"}
                  tabPosition={"bottom"}
                  style = {{height: "100%"}}
                  items={tabBars}
              />
          </Drawer>
      </>
    );
}

export default MainPresentation