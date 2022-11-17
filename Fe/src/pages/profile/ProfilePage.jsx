import {Col, Container, Row} from "react-bootstrap";
import {Avatar, Button, Card, Space} from "antd";
import Meta from "antd/es/card/Meta";
import {DownloadOutlined} from "@ant-design/icons";
import CardComponent from "../../components/card/CardComponent";

const ProfilePage = () => {
    return (
        <div>
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
                <Row className="justify-content-center mt-3">
                    <h3 className="text-center" style={{fontWeight: "350"}}>
                        Joined Groups
                    </h3>
                    <text className="text-center">
                        The more groups you join the more you can explore
                    </text>
                    <Row className="mt-2">
                      <Col xs={12} sm={12} lg={4} md={6} xl={4}>
                            <CardComponent/>
                        </Col>
                      <Col xs={12} sm={12} lg={4} md={6} xl={4}>
                        <CardComponent/>
                      </Col>
                      <Col xs={12} sm={12} lg={4} md={6} xl={4}>
                        <CardComponent/>
                      </Col>
                    </Row>
                </Row>

            <Col className="d-flex justify-content-center mt-3">
                <Button type="primary" shape="round" size={"large"} style={{background:"white", borderColor: "black", color:"black"}}>
                    See all groups
                </Button>

            </Col>



        </div>
    )
}

export default ProfilePage;