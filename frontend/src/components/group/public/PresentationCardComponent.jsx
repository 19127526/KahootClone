import React, {useState} from "react";
import {LikeOutlined, PlayCircleFilled, UserOutlined, UserDeleteOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";
import {
    acceptInvitation,
    deletePresentation, getCollaborators,
    inviteCollaboration,
    rejectInvitation, removeCollab
} from "../../../apis/presentation/presentationAPI";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {PRESENTATION_URI} from "../../../configs/url";
import {Input, List, Modal} from "antd";
import EmailComponent from "../../email/EmailComponent";
import {useSelector} from "react-redux";

const PresentationCardComponent = ({type, index, loadData}) => {
    const [openSetting, setOpenSetting] = useState(false);
    const navigate = useNavigate();
    const [value, setValue] = useState("")
    const dataProfile = useSelector(state => state.loginPage);
    const email = dataProfile.profile.email;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        // console.log(value)
        inviteCollaboration({id: index.id, email: email, emailInvited: value}).then((res) => {
            if (res.code === 202) {
                setValue("")
                Notification("Success", "Add Presentation success", constraintNotification.NOTIFICATION_SUCCESS)
            } else {
                setValue("")
                Notification("Error", res.response.data.message, constraintNotification.NOTIFICATION_ERROR)
            }
        })
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setValue("")
        setIsModalOpen(false);
    };


    const handleDelete = () => {
        // console.log(index, index.id)
        if (index.author === email) {
            deletePresentation({id: index.id, email: email}).then((response) => {
                console.log(response.status)
                if (response.status === 204) {
                    loadData({type: type})
                    Notification("Notification about remove presentation", `Remove presentation ${index.name} success`, constraintNotification.NOTIFICATION_SUCCESS)
                } else {
                    Notification("Notification about remove presentation", `Remove presentation ${index.name} fail`, constraintNotification.NOTIFICATION_ERROR)
                }
            })
        } else {
            Notification("Notification about remove presentation", `You don't have permission to do this`, constraintNotification.NOTIFICATION_ERROR)
        }

    }

    const handleAccept = () => {
        acceptInvitation({id: index.id, email: email}).then((res) => {
            if (res.status === 202) {
                loadData({type: "invited"})
                Notification("Notification", `Success`, constraintNotification.NOTIFICATION_SUCCESS)
            } else {
                Notification("Notification", `Failed`, constraintNotification.NOTIFICATION_ERROR)
            }
        })
    }

    const handleReject = () => {
        rejectInvitation({id: index.id, email: email}).then((res) => {
            if (res.status === 202) {
                loadData({type: "invited"})
                Notification("Notification", `Success`, constraintNotification.NOTIFICATION_SUCCESS)
            } else {
                Notification("Notification", `Failed`, constraintNotification.NOTIFICATION_ERROR)
            }
        })
    }

    const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
    const [listCollab, setListCollab] = useState([]);

    const showCollabModal = () => {
        setIsCollabModalOpen(true);
        getCollaborators({presentId: index.id}).then((res) => {
            setListCollab(res.data)
        })
    };

    const handleCollabCancel = () => {
        setIsCollabModalOpen(false);
    };

    return (
        <li className="item">
            <div className="item-row">
                <div className="item-col fixed pull-left item-col-title">
                    <div className="item-heading">Name</div>
                    <div>
                        {/* onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}*/}
                        <a
                            onClick={() => navigate(PRESENTATION_URI + `${index.id}/edit`)}>
                            <h4 className="item-title"> {index.name} </h4>
                        </a>
                    </div>
                </div>
                <div className="item-col item-col-author">
                    <div className="item-heading">Owner</div>
                    <div className="no-overflow" style={{marginLeft: "-16px"}}>
                        <div>{index.author}</div>
                    </div>
                </div>
                <div className="item-col item-col-date">
                    <div className="item-heading">Modified</div>
                    <div className="no-overflow" style={{marginRight: "20px"}}> {index.status}</div>
                </div>


                <div className="item-col fixed item-col-actions-dropdown" onClick={() => setOpenSetting(!openSetting)}>
                    <div className={openSetting === true ? "item-actions-dropdown active" : "item-actions-dropdown"}>
                        <a className="item-actions-toggle-btn">
              <span className="inactive">
                  <i className="fa fa-cog"></i>
              </span>
                            <span className="active">
                  <i className="fa fa-chevron-circle-right"></i>
              </span>
                        </a>
                        <div className="item-actions-block"
                             style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <ul className="item-actions-list">
                                <li>
                                    <a className="remove" data-toggle="modal" data-target="#confirm-modal"
                                       onClick={type === "created" ? handleDelete : handleReject}>
                                        <i className="fa fa-trash-o "></i>
                                    </a>
                                </li>
                                <li>

                                    {
                                        type === "created" ?
                                            <a className="invite" onClick={() => showModal()}>
                                                <i className="fa-solid fa-share-from-square"></i>
                                            </a>
                                            :
                                            <a className="invite" onClick={() => handleAccept()}>
                                                <LikeOutlined/>
                                            </a>
                                    }

                                </li>
                                <li>
                                    <a onClick={() => {
                                        // getCollaborators()
                                        showCollabModal()
                                    }}>
                                        <UserOutlined/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <Modal title="Invite Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered>
                <input type="text" className="form-control boxed rounded-s" style={{width: "100%"}}
                       placeholder="Enter email..." defaultValue={""} value={value}
                       onChange={(e) => {
                           setValue(e.target.value)
                       }}/>
            </Modal>

            <Modal title="Collaborators" open={isCollabModalOpen} footer={null} onCancel={handleCollabCancel} centered>
                <List
                    itemLayout="horizontal"
                    dataSource={listCollab}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                // title={<a href="https://ant.design">{item.title}</a>}
                                title={<text>{item.email}</text>}
                                description={item.roles}
                            />
                            {
                                item.roles !== "OWNER" ? <UserDeleteOutlined onClick={() => {
                                  removeCollab({id: index.id, email: email, emailRemoved: item.email}).then((res) => {
                                      getCollaborators({presentId: index.id}).then((res) => {
                                          setListCollab(res.data)
                                          loadData({type: type})
                                      })

                                  })
                                }
                                }/> : <div/>
                            }
                        </List.Item>
                    )}
                />
            </Modal>
        </li>
    )

}

export default PresentationCardComponent
