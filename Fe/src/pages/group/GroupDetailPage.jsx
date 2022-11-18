import React, {useEffect, useState} from "react";
import {Avatar, Divider, List, Skeleton} from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Row} from "react-bootstrap";

const ListGroupPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
    loadMoreData();
  }, []);
  return (
    <div className="container-group-detail">
      <div className="group-detail-wrap">
        <Row style={{textAlign: "center", margin: "15px"}}>
          <h1>Detail Group</h1>
        </Row>
        <Row style={{textAlign: "center", marginBottom: "15px"}}>
          <span className="card__description__detail" style={{padding:"0 2%"}}>the descriptions If you’ve been reading this blog for a while, you’ve probably seen at least one of our customer spotlights. We love our customers! As a former small business marketer myself, I love our passionate dedication to empowering and supporting small business growth.</span>
        </Row>

        <div className=" ant-divider"/>
        <Row style={{width: "100%"}} className="mb-5">
          <div
            className="scroll-group-detail"
            id="scrollableDiv"
          >
            <Row style={{textAlign: "center", margin: "15px"}}>
              <h2>Member in group</h2>
            </Row>
            <div className="ant-divider"/>
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              hasMore={data.length < 50}
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
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large}/>}
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={item.email}
                    />
                    <div className="role">Member</div>
                  </List.Item>
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