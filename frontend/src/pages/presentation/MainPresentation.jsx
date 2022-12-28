import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, {useCallback, useEffect, useRef, useState} from "react";

import {Avatar, ChatContainer, MainContainer, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import InfiniteScroll from 'react-infinite-scroll-component';
import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import {useLocation, useParams} from "react-router-dom";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {closePresentation, getDetailSlide, nextSlide} from "../../apis/slide/slideAPI";
import {Badge, Button, Col, Drawer, FloatButton, List, Skeleton, Space, Tabs} from "antd";
import {MessageOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {useSelector} from "react-redux";
import {getChat, getPresentationDetail} from "../../apis/presentation/presentationAPI";
import LoadingComponent from "../../components/loading/LoadingComponent";
import {SERVER_URL} from "../../configs/url";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

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
    const [isLoadingSlideList, setLoadingSlideList] = useState(true)
    const [isLoadingChangeChat, setLoadingChangeChat] = useState(false);
    const [loading1, setLoading1] = useState(false)

    const location = useLocation();
    const {id} = useParams()

    const [selectedValue, setSelectedValue] = useState(undefined)
    const [slideList, setListSlide] = useState([]);

    const presentId=location.state.firstSlide.presentationId;
    console.log(presentId)

    const [openChat, setOpenChat] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [unseenMessage, setUnseenMessage] = useState(0)
    const dataProfile = useSelector(state => state.loginPage);
    const [messageValue, setMessageValue] = useState("");
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const [isLoadingFirstChat, setIsLoadingFirstChat] = useState(false);
    const [offSetChat,setOffSetChat]=useState(10)

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
    /* if(location.pathname.includes("show")) {
         // eslint-disable-next-line react-hooks/rules-of-hooks
         useBeforeunload(() =>
           (location.state.type == "Private") ?
             closePresentation({presentationId: id, owner: email, groupId: location.state.groupId}).then((res) => {
                 console.log(res)
             })
             : ""
         );
     }*/

    useEffect(() => {
        // setLoadingSlideList(true)
        window.addEventListener('popstate', function myPop(event) {
            if (location.state.type == "Private") {
                closePresentation({presentationId: id, owner: email, groupId: location.state.groupId}).then((res) => {
                    console.log(res)
                    window.removeEventListener("popstate", myPop);
                })
            }
        });
        getPresentationDetail({id: location.state.id, email: email}).then((res) => {
            setListSlide(res.data.slides)
            setLoadingSlideList(false)
            setLoading1(true)
            getDetailSlide({id: res.data.slides[0].id}).then((res) => {
                setSelectedValue(res.data)
                setLoading1(false)
            })
        })

        registerUser()
    }, [])


    useEffect(() => {
        loadMoreChat()
    }, []);


    const loadMoreChat=()=>{
        setIsLoadingChat(true);
        if (isLoadingFirstChat == false) {
            const getListChat = async () => {
                await getChat({offset: 0, presentId: id, size: 15})
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
                await getChat({offset: offSetChat, presentId: id, size: 15})
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


    const showDrawer = ({type}) => {
        type ? setOpenChat(true) : setOpenQuestion(true);
        setUnseenMessage(0)

    };
    const onClose = ({type}) => {
        type ? setOpenChat(false) : setOpenQuestion(false);
    };


    const registerUser = () => {
        let Sock = new SockJS(`${SERVER_URL}/ws`);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe(`/application/${id}/presentation`, onMessageReceived);
    }

    const onMessageReceived = (payload) => {
        const receivedValue = JSON.parse(payload?.body)
        if (receivedValue.action === "CHAT") {
            const temp = messageList;
            temp.push(receivedValue);
            setMessageList(temp);
            /*if(email!=receivedValue.sender){
                setUnseenMessage(prevState => prevState+1)
            }*/
            setUnseenMessage(prevState => prevState + 1)

        }
        else if(receivedValue.action === "CHANGE_SLIDE"){
            // console.log(slideList)
            slideList.forEach((value, index) => {
                if(value.id === receivedValue.present_id){
                    console.log(value.id, receivedValue.present_id, activeIndex)
                    setActiveIndex(index)
                }
            })
        }
    }
    const onError = (err) => {
        console.log(err)
    }
    useEffect(() => {
        if (isLoadingSlideList == false&&isLoadingFirstChat==true) {
            registerUser();
        }
    }, [isLoadingSlideList,isLoadingFirstChat]);


    const handleMessageBtn = (event) => {
        if (stompClient) {
            console.log("DSD")
            let chatMessage = {
                sender: email,
                mess: messageValue,
                presentId: id,
            };
            stompClient.send("/chat/presentation", {}, JSON.stringify(chatMessage));
            /*const temp=[...messageList];
            temp.push(chatMessage)
            setMessageList(temp);*/
        }
    }


    useEffect(() => {
        if (slideList.length !== 0) {
            getDetailSlide({id: slideList[activeIndex].id}).then((res) => {
                setSelectedValue(res.data);
            })
        }
    }, [activeIndex])

    const onIndex = (e) => {
        setLoading1(true)
        console.log(location.state.id)
        if (location.state.groupId !== null || location.state.groupId !== undefined) {
            nextSlide({
                presentationId: location.state.id,
                email: email,
                groupId: location.state.groupId,
                action: activeIndex < e.activeIndex ? "NEXT_SLIDE" : "PREVIOUS_SLIDE"
            }).then((response) => {
                // console.log(response)
                setLoading1(false)
            })
        }
        setActiveIndex(e.activeIndex)
    }

    const handleMessage = (e) => {
        setMessageValue(e);
    }

    const messageEndRef=useRef(null);
    return (
      <>


        {/*<InfiniteScroll
          dataLength={messageList.length}

          next={loadMoreChat}
          hasMore={isLoadingChat}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          inverse={isLoadingChat} //
          style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          // below props only if you need pull down functionality
          refreshFunction={loadMoreChat}
          pullDownToRefresh={true}
          pullDownToRefreshThreshold={10}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595;</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593;</h3>
          }
          height="200px"
          endMessage={<span>It is all, nothing more 🤐</span>}

        >
          <List
            dataSource={messageList}
            renderItem={(item) => (
              <List.Item key={item.sender}>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.sender}</a>}
                  description={item.sender}
                />
                <div>{item.mess}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>*/}

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
                  isLoadingSlideList || slideList.length === 0 ? <LoadingComponent/> : <div>
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

          <Drawer title="Chat" placement="right" onClose={() => {
              onClose({type: true});
              setUnseenMessage(0)
          }} open={openChat}>

              <MainContainer>

                  <ChatContainer >
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
                              messageList.map((value,index) => {
                                      return (
                                        <Message model={{
                                            message: value.mess,
                                            sender: value.sender,
                                            direction: value.sender == email ? "outgoing" : "incoming",
                                            position: "single"
                                        }}>
                                            {value.sender !== email ?
                                              <Avatar src={value.sender} style={{
                                                  background: "aqua",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                              }}>PT</Avatar> :

                                              <Avatar src={value.sender} style={{
                                                  background: "antiquewhite",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center"
                                              }}>Me</Avatar>

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
      </>
    );
}

export default MainPresentation