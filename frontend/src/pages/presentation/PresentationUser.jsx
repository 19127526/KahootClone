import {Badge, Button, Card, Col, Drawer, Empty, FloatButton, List, Radio, Row, Select, Space, Typography} from "antd";
import React, {useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useLocation, useParams} from "react-router-dom";
import {
  askQuestion,
  getChat,
  joinPresentation,
  likeQuestion,
  postAnswer
} from "../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {SERVER_URL} from "../../configs/url";
import {MessageOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Avatar, ChatContainer, MainContainer, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./Presentation.css"


let stompClient=null

let flag=0;

const data = [
  {
    text_of_question: "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
    email_of_question: "abc@gmail.com",
    like_of_question: "0",
    isAnswer: false,
    id_of_question:null,
  },
  {
    text_of_question: "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
    email_of_question: "abc@gmail.com",
    like_of_question: "0",
    isAnswer: false,
    id_of_question:null,
  },
  {
    text_of_question: "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
    email_of_question: "abc@gmail.com",
    like_of_question: "0",
    isAnswer: true,
    id_of_question:null,
  },
  {
    text_of_question: "HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
    email_of_question: "abc@gmail.com",
    like_of_question: "0",
    isAnswer: true,
    id_of_question:null,
  },
];

const PresentationUser = () => {

  const location = useLocation()
  const [dataPresent,setDataPresent]=useState( undefined);
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
  const [unseenQuestion, setUnseenQuestion] = useState(0)
  const [defaultValue,setDefaultValue]=useState(false);
  const [messageList,setMessageList]=useState([]);
  const [messageInitList,setMessageInitList]=useState([]);
  const [messageValue,setMessageValue]=useState("");


  const[questionListBeforeSort,setQuestionListBeforeSort]=useState([])
  const [questionList,setQuestionList]=useState([]);
  const [questionValue,setQuestionValue]=useState("");

  const [openChat, setOpenChat] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(0);
  const [offSetChat,setOffSetChat]=useState(20)
  const messageEndRef=useRef(null);
  const [isLoadingInitChat,setIsLoadingInitChat]=useState(false)
  const type = location.state === null ? "Public" : "Private"


  const registerUser = () => {
    let Sock = new SockJS(`${SERVER_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }
  const onMessageNextSlideReceived = (payload) => {
    console.log("slide",JSON.parse(payload?.body));
    /*setReceived(JSON.parse(payload?.body))*/
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
        const temp = messageInitList;
        temp.push(receivedValue);
        setMessageInitList(temp);
        setUnseenMessage(prevState => prevState+1);
       /* if(email!=receivedValue.sender){
          setUnseenMessage(prevState => prevState+1);
        }*/

      }
      else if(receivedValue.action==="ASK_QUESTION"){
        const temp = questionList;
          temp.push({
            email_of_question: receivedValue?.email_of_question,
            text_of_question: receivedValue?.text_of_question,
            like_of_question: receivedValue?.like_of_question,
            isAnswer: receivedValue?.isAnswer,
            id_of_question: receivedValue?.id_of_question,
          });
        setQuestionList(temp);
        setUnseenQuestion(prevState => prevState + 1);
      }
      else if(receivedValue.action==="UPDATE_QUESTION"){
        const temp = questionList;
        for(let i=0;i<temp.length;i++){
          if(temp[i].id_of_question==receivedValue.id_of_question){
            temp[i].like_of_question=receivedValue.like_of_question
            temp[i].isAnswer=receivedValue.isAnswer
          }
        }
        setQuestionList(temp);
        setUnseenQuestion(prevState => prevState + 1);
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
    }
  }

  const handleQuestionBtn=async ({})=>{
    await askQuestion({question:questionValue,email:email,slideId:dataPresent?.slideId,presentId:preId})
      .then(res=>{
        if(res.status==200){
          Notification("Nofitication question","Send Question Success",constraintNotification.NOTIFICATION_SUCCESS)
        }
      })
  }




  const onConnected=()=>{
    stompClient.subscribe(`/application/${preId}/presentation`,onMessageNextSlideReceived);

  }


  const onError=(err)=>{

  }


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
      setQuestionList(data)
  },[]);
  useEffect(()=>{
    if(isLoadingInitChat){
      registerUser();
    }
  },[isLoadingInitChat])
      // console.log(location.state.slide)
  useEffect(()=>{
      if(type === "Public"){
           joinPresentation({preId:preId, email: profile.email})
              .then(res=>{
                  console.log(res)
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
      } else {
          setDataPresent(location.state.slide)
          setPresentOpen(1);
      }
  },[]);





  // useEffect(()=>{
  //   const getListOptionAndAnswer=async ()=>{
  //     await joinPresentation({preId:preId, email: profile.email, groupId: 2})
  //       .then(res=>{
  //         if(res.response?.status===400){
  //           if(res.response.data.message.includes("presentation is stopped")){
  //             setPresentOpen(0);
  //           }
  //           if(res.response.data.message.includes("slide not found")){
  //             setPresentOpen(0);
  //           }
  //         }
  //         else{
  //           setDataPresent(res.data);
  //           setPresentOpen(1);
  //         }
  //
  //       })
  //       .catch(err=>{console.log(err)})
  //   }
  //   getListOptionAndAnswer();
  // },[]);





    const onChange = (e) => {
        // console.log(e.target.key)
        setValue(e.target.value);
    };
    const addOption=async ()=>{
        // console.log({email:profile.email,slideId: dataPresent.id, presentId: preId,answer:value})
      await postAnswer({email:profile.email,slideId: dataPresent.slideId, presentId: preId,answer:value})
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

  const handleQuestion=(e)=>{
    setQuestionValue(e)
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

  const handleUpVote=async ({id})=> {
    await likeQuestion({email:email,questionId:id})
      .then(res=>{
        if(res.status==200){
          Notification("Nofitication question","Upvote Question Success",constraintNotification.NOTIFICATION_SUCCESS)
        }
        else if(res?.response?.status==400){
          Notification("Nofitication question","You Had Upvote Question !!",constraintNotification.NOTIFICATION_TITLE)
        }
      })
      .catch(err=>{
        Notification("Nofitication question",err.toString(),constraintNotification.NOTIFICATION_ERROR)
      })
  }

  return (
        <div style={{backgroundColor: "white", margin: "10%", padding: "5%"}}>
            {
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
                                <Row style={{justifyContent: "space-between"}}>
                                    <Row>
                                        <Radio value={item.id === null || item.id === undefined ? item.voteId : item.id } key={item.id === null || item.id === undefined ? item.voteId : item.id }>
                                            {/*{ item.id === null || item.id === undefined ? item.voteText :item.text}*/}
                                        </Radio>
                                        <Typography>{item.id === null || item.id === undefined ? item.voteText :item.text}</Typography>
                                    </Row>
                                    <Row>
                                        <Typography>{item.voteCount}</Typography>
                                    </Row>
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
            }






          <FloatButton.Group shape="circle" style={{right: 24}}>
            <Badge count={unseenMessage}><FloatButton icon={<MessageOutlined/>}
                                                      onClick={() => showDrawer({type: true})}
                                                      style={{marginBottom: 24}}/> </Badge>
            <Badge count={unseenQuestion}>
              <FloatButton  icon={<QuestionCircleOutlined/>} onClick={() => showDrawer({type: false})}/>
            </Badge>
          </FloatButton.Group>

          <Drawer title="Chat" placement="right" onClose={() => {onClose({type: true});setUnseenMessage(0)}} open={openChat}>

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
                  onClose={() => {
                    onClose({type: false});
                    setUnseenQuestion(0);
                  }}
                  open={openQuestion}>
            <div style={{height: "96%", overflowY: "scroll"}}>
              <List
                itemLayout="vertical"
                dataSource={questionList}
                renderItem={(item) => (
                  <List.Item>
                    <div>
                      <Space size={"small"}>
                        <text style={{color: "blue", fontWeight: "bold"}}>{item?.email_of_question}</text>
                        <Col>
                          <QuestionCircleOutlined className={"question-icon"}/>
                          <text> {item?.like_of_question}</text>
                        </Col>
                      </Space>

                      <text fontSize={10}>
                        Question: {item?.text_of_question}
                      </text>
                    </div>
                    {item?.isAnswer == true ?
                      <text fontSize={10}>
                        Answered
                      </text>
                      :
                      <Button type="text" style={{color: "grey", padding: 0}}
                              onClick={() => handleUpVote({id: item?.id_of_question})}>
                        Upvote question
                      </Button>
                    }

                  </List.Item>
                )}
              />
            </div>
            <MessageInput attachButton={false} placeholder="Type question here" onChange={handleQuestion}
                          onSend={handleQuestionBtn}
            />
          </Drawer>
        </div>

    )
}
export default PresentationUser