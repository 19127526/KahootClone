import {Badge, Button, Card, Col, Drawer, Empty, FloatButton, List, Radio, Row, Select, Space, Typography} from "antd";
import React, {useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {useLocation, useParams} from "react-router-dom";
import {
  askQuestion, dislikeQuestion,
  getChat, getQuestion,
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
import { format } from 'date-fns';


let stompClient=null

let flag=0;

let slideId=-1;
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
  const [isLoadingInitQuestion,setIsLoadingInitQuestion]=useState(false);
  const [isLoadingInitChat,setIsLoadingInitChat]=useState(false);
  const [checked,setChecked] = useState([])
  const type = location.state === null ? "Public" : "Private";
  const [disable, setDisable] = useState(false)
  const  [valueFilterQuestion,setValueFilterQuestion]=useState("Unanswer");
  const  [valueSortQuestion,setValueSortQuestion]=useState("Time");
  const registerUser = () => {
    let Sock = new SockJS(`${SERVER_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }
  const onMessageNextSlideReceived = (payload) => {
    const receivedValue = JSON.parse(payload?.body);
    console.log("dsdds",slideId,dataPresent?.slideId)
    let slideIdTemp=null;
    if(slideId==-1){
      slideIdTemp=dataPresent?.slideId
    }
    else{
      slideIdTemp=slideId
    }
    if (receivedValue.action === "STOP_PRESENTATION") {
      setPresentOpen(0)
      return (<Empty description="This slide is end, close please"
                     style={{display: "flex", justifyContent: "center", alignItems: "center"}}/>)
    } else if (receivedValue.action === "CHAT") {
      const temp = messageInitList;
      temp.push(receivedValue);
      setMessageInitList(temp);
      setUnseenMessage(prevState => prevState + 1);

    }
    else if(receivedValue.action==="ASK_QUESTION"){
      const temp = questionListBeforeSort;
      temp.push({
        email_of_question: receivedValue?.email_of_question,
        text_of_question: receivedValue?.text_of_question,
        like_of_question: receivedValue?.like_of_question,
        isAnswer: receivedValue?.isAnswer,
        id_of_question: receivedValue?.id_of_question,
        slideId:receivedValue?.slideId,
        createOn:receivedValue?.createOn
      });

      const tempFilter=temp.filter(index=>{
        if(valueFilterQuestion.includes("Answered")){
          return index?.isAnswer==true&&index?.slideId==slideIdTemp
        }
        else if(valueFilterQuestion.includes("Unanswer")){
          return index?.isAnswer==false&&index?.slideId==slideIdTemp
        }
      });

      if(valueSortQuestion.includes("Increase")){
        setQuestionList(tempFilter.sort(function (a,b){
          return a?.like_of_question - b?.like_of_question;
        }))
      }
      else if(valueSortQuestion.includes("Descrease")){
        setQuestionList(tempFilter.sort(function (a,b){
          return b?.like_of_question - a?.like_of_question;
        }))
      }
      else if(valueSortQuestion.includes("Time")){
        setQuestionList(tempFilter.sort(function (a,b){
          return Number(a?.createOn) - Number(b?.createOn);
        }))
      }

      setQuestionListBeforeSort(temp);
      setUnseenQuestion(prevState => prevState + 1);
    }
    else if(receivedValue.action==="UPDATE_QUESTION"){
      const temp = questionListBeforeSort;
      for(let i=0;i<temp.length;i++){
        if(temp[i].id_of_question==receivedValue.id_of_question){
          temp[i].like_of_question=receivedValue.like_of_question
          temp[i].isAnswer=receivedValue.isAnswer
        }
      }
      setQuestionList(temp.filter(index=>{
        if(valueFilterQuestion.includes("Answered")){
          return index?.isAnswer==true&&index?.slideId==slideIdTemp
        }
        else if(valueFilterQuestion.includes("Unanswer")){
          return index?.isAnswer==false&&index?.slideId==slideIdTemp
        }
      }))
      setQuestionListBeforeSort(temp);
      setUnseenQuestion(prevState => prevState + 1);
    }
    else {
      slideId=receivedValue?.slideId
      setDataPresent(receivedValue);
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

        }
      })
  }




  const onConnected=()=>{
    stompClient.subscribe(`/application/${preId}/presentation`,onMessageNextSlideReceived);

  }


  const onError=(err)=>{

  }

  useEffect(()=>{
    let slideIdTemp=null;
    if(slideId==-1){
      slideIdTemp=dataPresent?.slideId
    }
    else{
      slideIdTemp=slideId
    }
    if(valueFilterQuestion.includes("Unanswer")){
      setQuestionList(questionListBeforeSort
        .filter(index=>index?.isAnswer==false&&index?.slideId==slideIdTemp))
    }
    else if(valueFilterQuestion.includes("Answered")){
      setQuestionList(questionListBeforeSort
        .filter(index=>index?.isAnswer==true&&index?.slideId==slideIdTemp))
    }
  },[valueFilterQuestion,valueSortQuestion]);

  useEffect(()=>{
    let slideIdTemp=null;
    if(slideId==-1){
      slideIdTemp=dataPresent?.slideId
    }
    else{
      slideIdTemp=slideId
    }
    const temp= questionListBeforeSort.filter(index=>{
      if(valueFilterQuestion.includes("Answered")) {
        return index?.isAnswer==true&&index?.slideId==slideIdTemp
      }
      else{
        return index?.isAnswer==false&&index?.slideId==slideIdTemp
      }
    })
    if(valueSortQuestion.includes("Increase")){
      setQuestionList(temp.sort(function (a,b){
        return a?.like_of_question - b?.like_of_question;
      }))
    }
    else if(valueSortQuestion.includes("Descrease")){
      setQuestionList(temp.sort(function (a,b){
        return b?.like_of_question - a?.like_of_question;
      }))
    }
    else if(valueSortQuestion.includes("Time")){
      setQuestionList(temp.sort(function (a,b){
        return Number(a?.createOn) - Number(b?.createOn);
      }))
    }
  },[valueSortQuestion,valueFilterQuestion,dataPresent])


  useEffect(()=>{
    if(questionListBeforeSort.toString()==questionList.toString()) {
      let slideIdTemp = null;
      if (slideId == -1) {
        slideIdTemp = dataPresent?.slideId
      } else {
        slideIdTemp = slideId
      }
      if (valueFilterQuestion.includes("Unanswer")) {
        setQuestionList(questionListBeforeSort.filter(index => index?.isAnswer == false && index?.slideId == slideIdTemp))
      } else if (valueFilterQuestion.includes("Answered")) {
        setQuestionList(questionListBeforeSort.filter(index => index?.isAnswer == true && index?.slideId == slideIdTemp))
      }
    }
  },[questionListBeforeSort])

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
    const getListQuestion= async ()=>{
      await getQuestion({presentId:preId})
        .then(res=>{
          if(res?.status==200){
            const temp=res?.data.map(index=>{
              return{
                text_of_question: index?.text,
                email_of_question: index?.email,
                like_of_question: index?.like,
                isAnswer: index?.isAnswer,
                id_of_question: index?.id,
                createOn:index?.createdOn,
                slideId:index?.slideId,
              }
            })
            setIsLoadingInitQuestion(true)
            setQuestionList(temp);
            setQuestionListBeforeSort(temp);
          }
        })
        .catch(()=>{

        })
    }

    getListChat();
    getListQuestion();
  },[]);
  useEffect(()=>{
    if(isLoadingInitChat&&isLoadingInitQuestion){
      registerUser();
    }
  },[isLoadingInitChat,isLoadingInitQuestion])
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
        console.log(dataPresent)
        console.log(checked)
        if(checked.findIndex((value) => value === dataPresent.slideId) === -1){
            await postAnswer({email:profile.email,slideId: dataPresent.slideId, presentId: preId,answer:value})
                .then((res=>{
                    console.log(res)
                    setChecked([...checked,dataPresent.slideId])
                    setDisable(true)
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
        } else {
            Notification("Notification submit","Already voted",constraintNotification.NOTIFICATION_ERROR)
            setDisable(true)
        }

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

        }
        else if(res?.response?.status==400){
          Notification("Nofitication question","You Had Upvote Question !!",constraintNotification.NOTIFICATION_TITLE)
        }
      })
      .catch(err=>{
        Notification("Nofitication question",err.toString(),constraintNotification.NOTIFICATION_ERROR)
      })
  }

  const handleDownVote=async ({id})=> {
    await dislikeQuestion({email:email,questionId:id})
      .then(res=>{
        if(res.status==200){

        }
        else if(res?.response?.status==400){
          Notification("Nofitication question","You Had Downvote Question !!",constraintNotification.NOTIFICATION_TITLE)
        }
      })
      .catch(err=>{
        Notification("Nofitication question",err.toString(),constraintNotification.NOTIFICATION_ERROR)
      })
  }

  const handleFilterQuestion=(e)=>{
    setValueFilterQuestion(e)
  }

  const handleSortQuestion=(e)=>{
    setValueSortQuestion(e)
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
                            <Button onClick={addOption} disabled={disable}>
                                Submit
                            </Button>
                        </Row>
                    </Space></> : <SlidePresentation selectedValue={dataPresent} height={"45%"} width={"100%"}/>
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
                            <Avatar src={value.sender} style={{background:"aqua",display:"flex",justifyContent:"center",alignItems:"center"}}>{email[0]}</Avatar>
                            :
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
                        width: "120px"
                      }}
                      value={valueFilterQuestion}
                      onChange={handleFilterQuestion}
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
                      ]}
                    />
          }
                  onClose={() => {
                    onClose({type: false});
                    setUnseenQuestion(0);
                  }}
                  open={openQuestion}>
            <div style={{height: "96%", overflowY: "scroll"}}>
              <Select
                showSearch
                placeholder="Sort question"
                optionFilterProp="children"
                style={{
                  width: "150px"
                }}
                value={valueSortQuestion}
                onChange={handleSortQuestion}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'Descrease',
                    label: 'Vote Descrease',
                  },
                  {
                    value: 'Increase',
                    label: 'Vote Increase',
                  },
                  {
                    value: 'Time',
                    label: 'Time Asked',
                  },
                ]}
              />
              <List
                itemLayout="vertical"
                dataSource={questionList}
                renderItem={(item) => (
                  <List.Item>
                    <div>
                      <div>
                        <div>
                          <text>Time Asked: {format(new Date(parseInt(item?.createOn, 10)),'dd/MM/yyyy kk:mm:ss')}</text>
                        </div>
                      <Space size={"small"}>
                        <text style={{color: "blue", fontWeight: "bold"}}>{item?.email_of_question}</text>
                        <Col>
                          <QuestionCircleOutlined className={"question-icon"}/>
                          <text> {item?.like_of_question}</text>
                        </Col>
                      </Space>
                      </div>
                      <text fontSize={10}>
                        Question: {item?.text_of_question}
                      </text>
                    </div>
                    {item?.isAnswer == true ?
                      <text fontSize={10} style={{color:"green"}}>
                        Answered
                      </text>
                      :
                      <Space size={"small"}>
                      <Button type="text" style={{color: "grey", padding: 0}}
                              onClick={() => handleUpVote({id: item?.id_of_question})}>
                        Upvote question
                      </Button>

                      <Button type="text" style={{color: "grey", padding: 0}}
                      onClick={() => handleDownVote({id: item?.id_of_question})}>
                      Downvote question
                      </Button>
                      </Space>
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