import React, {useEffect, useState} from "react";
import {Avatar, Button, Divider, List, Modal, Skeleton} from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Row} from "react-bootstrap";
import {getDetailGroup} from "../../apis/group/groupApi";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import OtpRemoveMember from "../../components/otpremovemember/OtpRemoveMember";

const ListGroupPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {name} = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const dataProfile = useSelector(state => state.loginPage).profile;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
    console.log(dataProfile.email)
    console.log(name)
    getDetailGroup({email: dataProfile.email, id: name})
      .then(res => {
        console.log(res.data.users)
        setData(res.data.users);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })

  }, []);

  return (
    <div className="container-group-detail">
      <div className="group-detail-wrap">
        <Divider plain style={{fontSize: "30px"}}>Detail Group</Divider>
        <Row style={{textAlign: "center", marginBottom: "15px"}}>
          <span className="card__description__detail" style={{padding: "0 4vh"}}>Welcome to visit {name} group</span>
        </Row>
        <div className=" ant-divider"/>
        <Row style={{width: "100%"}} className="mb-5">
          <div
            className="scroll-group-detail"
            id="scrollableDiv"
          >
            <Divider plain style={{fontSize: "20px"}}>Member in group</Divider>
            <div style={{display: "flex", marginBottom: "10px"}}>
              {isOwner === true ? <Button type="primary" shape={"round"} style={{marginLeft: "auto"}}
                                          onClick={() => showModal()}>
                Kick Member
              </Button> : ""}

              <Modal title="Remove Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered
                     style={{background: "red"}}>
                <OtpRemoveMember onSubmit={() => setIsModalOpen(false)} nameRoom={name} listEmail={data}/>
              </Modal>
            </div>

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
                        title={<a>{item.userName}</a>}
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