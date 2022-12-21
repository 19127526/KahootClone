import {Button, Dropdown, Popconfirm, Space, Typography} from "antd";
import {DeleteOutlined, DownOutlined} from "@ant-design/icons";
import {assignRole, getDetailGroup, removeGroup, removeMember} from "../../../apis/group/groupApi";
import {useNavigate} from "react-router-dom";
import {CREATED_GROUP_URI} from "../../../configs/url";
import Notification from "../../notification/Notification"
import * as StatusNotificaion from "../../notification/Notification.constraints"

const items = [
  {
    key: '0',
    label: 'Co_OWNER',
  },
  {
    key: '1',
    label: 'MEMBER',
  },
];
const OwnerCard = ({owner, id, email, userMame, role, setItem}) => {
  const navigate = useNavigate();
  // const location = useLocation()
  // console.log(location)
  const onClick = ({key}) => {
    assignRole({email: owner, id: id, assignedEmail: email, role: items[key].label}).then(() => {
      console.log(owner, id, email, items[key].label)
      getDetailGroup({email: owner, id: id})
        .then(res => {
          if (res.status == 200) {
            Notification("notification", `Change Role ${items[key].label} Success`, StatusNotificaion.NOTIFICATION_SUCCESS)
            setItem(res.data.users)
          } else {
            Notification("notification", "Change Role Fail", StatusNotificaion.NOTIFICATION_ERROR)
          }
        })
        .catch(err => {
          Notification("notification", err.toString(), StatusNotificaion.NOTIFICATION_ERROR)
        })
    })
  }

  const remove = () => {
    if (role === "OWNER") {
      removeGroup({id, email}).then(() => {
        navigate(CREATED_GROUP_URI)
      })
    } else {
      removeMember({id: id, email: owner, emailRemoved: email}).then(() => {
        getDetailGroup({email: owner, id: id}).then(res => {
          setItem(res.data.users)
        })
      })
    }
  }
  return (
    <li className="item">
      <div className="item-row">
        {/*<div className="item-col fixed item-col-check">*/}
        {/*  <label className="item-check" id="select-all-items">*/}
        {/*    <input type="checkbox" className="checkbox"/>*/}
        {/*    <span></span>*/}
        {/*  </label>*/}
        {/*</div>*/}
        {/*<div className="item-col fixed item-col-img md">*/}
        {/*  <a href="item-editor.html">*/}
        {/*    <div className="item-img rounded"*/}
        {/*         style={{backgroundImage: `url(${imageUrl})`}}></div>*/}
        {/*  </a>*/}
        {/*</div>*/}
        <div className="item-col fixed pull-left item-col-title">
          <div className="item-heading">Name</div>
          <div>
            {/*<a href="item-editor.html" className="">*/}
            <h4 className="item-title"> {userMame} </h4>
            {/*</a>*/}
          </div>
        </div>
        {/*<div className="item-col item-col-sales">*/}
        {/*  <div className="item-heading">Score</div>*/}
        {/*  <div style={{marginRight:"20px"}}> {score}</div>*/}
        {/*</div>*/}


        <div className="item-col item-col-author">
          <div className="item-heading">Role</div>
          <div className="no-overflow" style={{marginLeft: "10px"}}>
            {/*<a href="#">{role}</a>*/}
            {
              role === "OWNER" ? <Typography>
                {role}
              </Typography> : <Dropdown
                menu={{
                  items,
                  onClick
                }}
              >
                <Typography.Link onClick={(e) => e.preventDefault()}>
                  <Space>
                    {role}
                    <DownOutlined/>
                  </Space>
                </Typography.Link>
              </Dropdown>
            }
          </div>
        </div>
        <div className="item-col item-col-date">
          <div className="item-heading">Email</div>
          <div className="no-overflow"> {email}</div>
        </div>
        <div className="item-col fixed item-col-actions-dropdown">
          <Popconfirm placement="topLeft" title={
            role === "OWNER" ? "Do you really want to delete this group?" : "Do you want to delete this member"
          } onConfirm={remove} okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined/>}/>
          </Popconfirm>
        </div>
        {/*<div className="item-col fixed item-col-actions-dropdown">*/}
        {/*  <div className="item-actions-dropdown">*/}
        {/*    <a className="item-actions-toggle-btn">*/}
        {/*                                        <span className="inactive">*/}
        {/*                                            <i className="fa fa-cog"></i>*/}
        {/*                                        </span>*/}
        {/*      <span className="active">*/}
        {/*                                            <i className="fa fa-chevron-circle-right"></i>*/}
        {/*                                        </span>*/}
        {/*    </a>*/}
        {/*    <div className="item-actions-block">*/}
        {/*      <ul className="item-actions-list">*/}
        {/*        <li>*/}
        {/*          <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal">*/}
        {/*            <i className="fa fa-trash-o "></i>*/}
        {/*          </a>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*          <a className="edit" href="item-editor.html">*/}
        {/*            <i className="fa fa-pencil"></i>*/}
        {/*          </a>*/}
        {/*        </li>*/}
        {/*      </ul>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </li>
  )
}

export default OwnerCard