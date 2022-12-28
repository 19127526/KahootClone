import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, {useCallback, useEffect, useRef, useState} from "react";

import {Avatar, ChatContainer, MainContainer, Message, MessageInput, MessageList,MessageSeparator,MessageGroup} from "@chatscope/chat-ui-kit-react";
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


const MainPresentation =() => {
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedMessages, setLoadedMessages] = useState([]);
    const [counter, setCounter] = useState(0);

    const onYReachStart = () => {
        if (loadingMore === true) {
            return;
        }

        setLoadingMore(true);
        /* Fake fetch from API */

        setTimeout(() => {
            const messages = [];
            /* Add 10 messages */

            const maxCounter = counter + 10;
            let i = counter;

            for (; i < maxCounter; i++) {
                messages.push(<Message key={i} model={{
                    message: `Message ${i}`,
                    sender: "Zoe"
                }} />);
            }

            setLoadedMessages(messages.reverse().concat(loadedMessages));
            setCounter(i);
            setLoadingMore(false);
        }, 1500);
    };

    return <div style={{
        height: "500px",
        overflow: "hidden"
    }}>

        <MessageList loadingMore={loadingMore} onYReachStart={onYReachStart}>
            <MessageSeparator content="Saturday, 30 November 2019" />

            {loadedMessages}

            <MessageGroup direction="incoming">
                <Avatar src={"zoeIco"} name={"Zoe"} />
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="outgoing">
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup>
                <Avatar src={"zoeIco"} name={"Zoe"} />
                <MessageGroup.Messages direction="incoming">
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="outgoing">
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="incoming">
                <Avatar src={"dsd"} name={"Zoe"} />
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageSeparator content="Saturday, 31 November 2019" />

            <MessageGroup direction="incoming">
                <Avatar src={"dsd"} name={"Zoe"} />
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="outgoing">
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="incoming">
                <Avatar src={"dsd"} name={"Zoe"} />
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="outgoing">
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Akane"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>

            <MessageGroup direction="incoming">
                <Avatar src={'ds'} name={"Zoe"} />
                <MessageGroup.Messages>
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                    <Message model={{
                        message: "Hello my friend",
                        sentTime: "15 mins ago",
                        sender: "Zoe"
                    }} />
                </MessageGroup.Messages>
            </MessageGroup>
        </MessageList>
    </div>;
}

export default MainPresentation