import {Col, Container, Row, Stack} from "react-bootstrap";
import {Avatar, Button, Card, Space} from "antd";
import Meta from "antd/es/card/Meta";
<<<<<<< HEAD
import Carousel from 'react-elastic-carousel';

const items =  [
   1,2,3,4,5
]

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];

=======
import {DownloadOutlined} from "@ant-design/icons";
>>>>>>> parent of 7c573bc (fix layout)

const ProfilePage = () => {
    return (
        <Container>
                <Row className="d-flex justify-content-center">
                        <Avatar size={105}
                                src="https://yt3.ggpht.com/ytc/AMLnZu9tBVuzay5LAvsf-dQz4uHepY7NfnXARBbVXBeibg=s900-c-k-c0x00ffffff-no-rj"/>
                        <b className="text-center">
                            Thanh Son
                        </b>
                        <text className="text-center" style={{fontWeight: "200", fontSize:"12px"}}>
                            Members
                        </text>
                </Row>
<<<<<<< HEAD
=======

                <Row className="justify-content-center mt-3">
                    <h3 className="text-center" style={{fontWeight: "350"}}>
                        Joined Groups
                    </h3>
                    <text className="text-center">
                        The more groups you join the more you can explore
                    </text>
                    <Row className="mt-2">
                        <Col>
                            <Card
                                style={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                            >
                                <Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                            >
                                <Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card
                                style={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                            >
                                <Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Row>
>>>>>>> parent of 7c573bc (fix layout)


            <div>
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <h3  style={{fontWeight: "350", textAlign:"center"}}>
                            Joined Groups
                        </h3>
                        <text style={{textAlign:"center"}}>
                            The more groups you join the more you can explore
                        </text>
                    </div>
                </div>

                <Carousel  breakPoints={breakPoints}>
                    {items.map(item =>                                <Card
                            style={{
                                width: 400,
                                margin: 10,
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"}}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                        >
                            <Meta
                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    )}
                </Carousel>

                <Col className="d-flex justify-content-center mt-3">
                    <Button type="primary" shape="round" size={"large"} style={{background:"white", borderColor: "black", color:"black"}}>
                        See all groups
                    </Button>
                </Col>

                <div className="m-5 ant-divider"/>

            </div>



<<<<<<< HEAD


=======
>>>>>>> parent of 7c573bc (fix layout)
        </Container>
    )
}

export default ProfilePage;