import {Button, Dropdown, Popconfirm, Space, Typography} from "antd";
import {DeleteOutlined, DownOutlined} from "@ant-design/icons";
const MemberCard = ({email, userMame, role}) => {
    return (
        <li className="item">
            <div className="item-row">
                <div className="item-col fixed pull-left item-col-title">
                    <div className="item-heading">Name</div>
                    <div>
                        {/*<a href="item-editor.html" className="">*/}
                        <h4 className="item-title"> {userMame} </h4>
                        {/*</a>*/}
                    </div>
                </div>
                <div className="item-col item-col-author">
                    <div className="item-heading">Role</div>
                    <div className="no-overflow" style={{marginLeft:"10px"}}>
                        {role}
                    </div>
                </div>
                <div className="item-col item-col-date">
                    <div className="item-heading">Email</div>
                    <div className="no-overflow"> {email}</div>
                </div>
                <div className="item-col fixed item-col-actions-dropdown">
                </div>
            </div>
        </li>
    )
}

export default MemberCard