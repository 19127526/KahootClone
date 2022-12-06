import {Button, Dropdown, Modal} from "antd";
import {CaretDownOutlined, CloseOutlined, MailOutlined} from "@ant-design/icons";
import EmailComponent from "../email/EmailComponent";
import {useState} from "react";


const itemsNormal = [
  {
    label: 'Leave',
    key: '2',
    icon: <CloseOutlined/>
  },
];

const itemsCreated = [
  {
    label: 'Invite',
    key: '1',
    icon: <MailOutlined/>
  },
  {
    label: 'Leave',
    key: '2',
    icon: <CloseOutlined/>
  },
];

const DropdownCustom = ({typeRoom,code,url,name}) => {
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
  const handleMenuClick = (e) => {
    console.log(e.key)
    if (e.key == 1) {
      showModal()
    }
  };

  if (typeRoom.includes("created")) {

    const menuProps = {
      items: itemsCreated,
      onClick: handleMenuClick,
    };
    return (
      <>
        <Dropdown menu={menuProps}>
          <Button type="primary" icon={<CaretDownOutlined/>} size={20}
                  style={{border: "none", boxShadow: "none"}}/>
        </Dropdown>
        <Modal title="Invite Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered>
          <EmailComponent onSubmit={() => setIsModalOpen(false)} code={code} url={url} name={name}/>
        </Modal>
      </>
    )
  } else {
    const menuProps = {
      items: itemsNormal,
      onClick: handleMenuClick,
    };
    return (
      <Dropdown menu={menuProps}>
        <Button type="primary" icon={<CaretDownOutlined/>} size={20}
                style={{border: "none", boxShadow: "none"}}/>
      </Dropdown>
    );
  }

}

export default DropdownCustom