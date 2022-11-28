import {Col, Container} from "react-bootstrap";
import {Button, Divider, List, Modal, Row, Skeleton, Tabs} from "antd";
import Search from "antd/es/input/Search";
import GroupCard from "../../components/card/GroupCard";
import InfiniteScroll from "react-infinite-scroll-component";
import {PlusCircleFilled} from "@ant-design/icons";
import OTPCreateGroup from "../../components/card/OTPCreateGroup";
import {useState} from "react";

const contents = [1,2,3,4,5];

const GroupContent = () => {
    return (
        <InfiniteScroll
            dataLength={contents.length}
            loader={
                <Skeleton
                    paragraph={{
                        rows: 5,
                    }}
                />
            }
            endMessage={<Divider plain>End</Divider>}
            scrollableTarget="scrollableDiv"
        >
            <Row className="m-2">
                {contents?.map((user, index) =>
                        <Col xs={12} sm={12} lg={4} md={6} xl={4} style={{paddingBottom: 10}}>
                            <GroupCard/>
                        </Col>
                    )
                }
            </Row>
        </InfiniteScroll>
    );
}

const pages = [
    {
        label: `Joined Groups`,
        key: 1,
        children: GroupContent(),
    },
    {
        label: `Created Groups`,
        key: 2,
        children: GroupContent(),
    }
];




const ListGroupPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (

        <div className="container-profile">
            <div className="body__overlay"></div>
            <img src="img/body-img.jpg" alt="Hermoso fondo de pantalla" className="body__img"/>
            <div className="main-content" style={{background:"white", border:"dashed", overflow:"auto"}}>
                <Container style={{padding: 20}}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                    />
                    <div style={{height: 10}}/>
                        <Tabs
                            tabBarExtraContent={
                                <Button type="primary" shape="round" icon = {<PlusCircleFilled />} onClick={showModal}/>
                            }
                            defaultActiveKey="1"
                            type="card"
                            size={"large"}
                            items={pages}
                        />
                </Container>

                <OTPCreateGroup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </div>
        </div>
    );
}



export  default ListGroupPage