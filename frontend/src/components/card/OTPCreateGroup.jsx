import Container from "react-bootstrap/Container";
import {Button, Input, Modal, Space} from "antd";
import {Text} from "@chakra-ui/react";


const OTPCreateGroup = ({isModalOpen, setIsModalOpen}) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Create group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
               centered={true}
        >
            <p>
                Name
            </p>
            <Input size="large" placeholder="Input group name" />
            <p style={{visibility:"hidden"}}>
                JAKLSDJK
            </p>
        </Modal>
    );
}

export default OTPCreateGroup