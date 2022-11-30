import Container from "react-bootstrap/Container";
import {Button, Input, Modal, Space} from "antd";
import {Text} from "@chakra-ui/react";
import {useState} from "react";
import request from "../../apis/request";
import {CREATE_GROUP} from "../../configs/url";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints"


const OTPCreateGroup = ({isModalOpen, setIsModalOpen, profile}) => {
    const [groupName, setGroupName] = useState("");
    const [isVisible, setVisible] = useState(false);
    const [validator, setValidator] = useState("");

    const handleGroupName = (event) => {
        setVisible(false);
        setGroupName(event.target.value)
    }

    const handleOk = async () => {
        if (groupName == "") {
            setVisible(true);
            setValidator("Group name can't be empty")
            return;
        }

        let response = await request.post(
            CREATE_GROUP,
            {
                "name": groupName,
                "email": profile.email
            }
        );
        console.log(response)
        if(response.status == 202){
            setIsModalOpen(false);
            setVisible(false);
            setValidator("");
            setGroupName("");
            Notification("Success", "Group added", constraintNotification.NOTIFICATION_SUCCESS);
        } else {
            setVisible(true);
            setValidator("Group name is existed. Try another one");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setVisible(false);
        setGroupName("");
    };


    return (
        <Modal title="Create group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
               centered={true}>
            <Container>
                <p>
                    Name
                </p>
                <Input
                    value = {groupName}
                    size="large" showCount maxlength={20} allowClear placeholder="Input group name"
                    onChange={handleGroupName}/>

                <p style={{visibility: isVisible ? "visible" : "hidden", color: "red"}}>
                    {validator}
                </p>
            </Container>
        </Modal>
    );
}

export default OTPCreateGroup