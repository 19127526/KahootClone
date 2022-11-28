import {Container} from "react-bootstrap";
import {Avatar, Button, Card, Modal, Row} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import {useState} from "react";
import EmailComponent from "../email/EmailComponent";
import DropdownCustom from "./DropdownCustom";

const GroupCard = () => {
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

    return (
        <div className="site-card-border-less-wrapper">
            <Card style={{
                width: 350,
                borderRadius: 10,
                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                borderColor: "black"
            }}>
                <Row style={{display: "flex", justifyContent: "space-between", marginBottom: 10}}>
                    <text style={{
                        background: "#f5365c",
                        borderRadius: 10,
                        padding: 5,
                        boxShadow: "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",
                        color: "#fff"
                    }}>
                        Public group
                    </text>
                    <DropdownCustom/>
                </Row>
                <div style={{color: "#444", fontSize: "18px", fontWeight: 600, overflow: "clip"}}>
                    XXX
                </div>
                <div style={{color: "grey", fontSize: "12px"}}>
                    200 thành viên
                </div>
                <Container style={{
                    height: 150,
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 0,
                    overflow: "auto",
                }}>
                    <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of
                        Lorem Ipsum.
                    </div>
                </Container>
                <Row style={{display: "flex", justifyContent: "space-between"}}>
                    <Button type="primary" shape="round" size="large" onClick={showModal}>
                        Join
                    </Button>
                    <Modal  title="Join Group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  centered>
                        <EmailComponent  onSubmit={()=>setIsModalOpen(false)}/>
                    </Modal>
                    <Avatar src="https://joeschmoe.io/api/v1/random" size={"large"} style={{borderColor: "black"}}/>
                </Row>
            </Card>
        </div>
    );
}


export default GroupCard