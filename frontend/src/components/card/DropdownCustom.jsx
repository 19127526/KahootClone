import {Button, Dropdown, Space} from "antd";
import {CaretDownOutlined, CloseOutlined, DownOutlined} from "@ant-design/icons";

const handleMenuClick = (e) => {
    console.log('click', e);
};
const items = [
    {
        label: 'Leave',
        key: '1',
        icon: <CloseOutlined />
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};

const DropdownCustom = () => {
    return (
        <Dropdown menu={menuProps}>
            <Button type="primary" icon={<CaretDownOutlined/>} size={20}
                    style={{border: "none", boxShadow: "none"}}/>
        </Dropdown>
    );
}

export default DropdownCustom