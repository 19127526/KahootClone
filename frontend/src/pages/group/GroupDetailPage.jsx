import React, {useEffect, useState} from "react";
import {Avatar, BackTop, Divider, List, Skeleton} from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Row} from "react-bootstrap";
import {getDetailGroup} from "../../apis/group/groupApi";
import {useLocation, useParams} from "react-router-dom";

const ListGroupPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {name}=useParams();
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    getDetailGroup({name:name})
      .then(res=>{
        console.log(res.data);
        setData(res.data.userRoom);
        setLoading(false);
      })
      .catch(err=>{
        setLoading(false);
        console.log(err)
      })

  }, []);
  return (
    <div className="container-group-detail">
      <div className="group-detail-wrap">
          <Divider plain style={{fontSize:"30px"}}>Detail Group</Divider>
        <Row style={{textAlign: "center", marginBottom: "15px"}}>
          <span className="card__description__detail" style={{padding:"0 4vh"}}>the descriptions If you’ve been reading this blog for a while, you’ve probably seen at least one of our customer spotlights. We love our customers! As a former small business marketer myself, I love our passionate dedication to empowering and supporting small business growth.</span>
        </Row>
        <div className=" ant-divider"/>
        <Row style={{width: "100%"}} className="mb-5">
          <div
            className="scroll-group-detail"
            id="scrollableDiv"
          >
            <Divider plain style={{fontSize:"20px"}}>Member in group</Divider>
            <div className="ant-divider"/>
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              hasMore={data.length < data.length}
              loader={
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 1,
                  }}
                  active
                />
              }
              endMessage={<Divider plain>Done</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <>
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.imageURL}/>}
                      title={<a href="https://ant.design">{item.userName}</a>}
                      description={item.email}
                    />
                    <div className="role">{item.role}</div>
                  </List.Item>
                  </>
                )}
              />
            </InfiniteScroll>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default ListGroupPage