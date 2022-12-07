import React, {useState} from "react";
import {PlayCircleFilled} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";
import {deletePresentation} from "../../../apis/presentation/presentationAPI";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {PRESENTATION_URI} from "../../../configs/url";
import {Modal} from "antd";
import EmailComponent from "../../email/EmailComponent";
const ModalInvitePresentation=({id})=>{
  return (
    <div className="modal fade" id={id} >
      <div className="modal-dialog" role="document" style={{top:"30%"}}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-opera"></i> Invite member to join presentation</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-inline">
              <div className="input-group">

                <input type="text" className="form-control boxed rounded-s" style={{width: "400px"}}
                       placeholder="Enter email member... " defaultValue={"dsdsds"}/>

                <input type="email" className="form-control boxed rounded-s" style={{width: "400px"}}
                       placeholder="Enter email member... "/>
                <span className="input-group-btn align-content-center" style={{marginTop:"5px"}}>
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button" style={{marginRight:"5px"}}>
                Cancel
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button">
                Invite
                </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const PresentationCardComponent=({index, list, setData})=>{
  const [openSetting,setOpenSetting]=useState(false);
  const navigate=useNavigate();

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


  const handleDelete = () => {
    deletePresentation({id: index.id}).then((response) => {
      if(response.status === 204){
        setData(list.filter(value => value !== index))
        Notification("Notification about remove presentation",`Remove presentation ${index.name} success`,constraintNotification.NOTIFICATION_SUCCESS)
      }
      else{
        Notification("Notification about remove presentation",`Remove presentation ${index.name} fail`,constraintNotification.NOTIFICATION_ERROR)
      }
    })
      .catch(err=>{
        Notification("Notification about remove presentation",`Remove presentation ${index.name} fail`,constraintNotification.NOTIFICATION_ERROR)
      })
  }

  return (
    <li className="item">
      <div className="item-row">
        <div className="item-col fixed item-col-check">
          <label className="item-check" id="select-all-items">
            <input type="checkbox" className="checkbox"/>
            <span></span>
          </label>
        </div>
        <div className="item-col fixed item-col-img md">
          <a>
            <div className="item-skip-img">
              <PlayCircleFilled className="item-skip"/>
            </div>
                </a>
        </div>
        <div className="item-col fixed pull-left item-col-title">
          <div className="item-heading">Name</div>
          <div>
            {/* onClick={() => navigate(`/admin/category/${index.CatId}/${index.ProId}`, {state: {index: index}})}*/}
            <a
              onClick={()=>navigate(PRESENTATION_URI+ `${index.id}/edit`)}>
              <h4 className="item-title"> {index.name} </h4>
            </a>
          </div>
        </div>
        <div className="item-col item-col-author">
          <div className="item-heading">Owner</div>
          <div className="no-overflow"  style={{marginLeft:"-16px"}}>
            <div>{index.author}</div>
          </div>
        </div>
        <div className="item-col item-col-date">
          <div className="item-heading">Modified</div>
          <div className="no-overflow" style={{marginRight:"20px"}}> ""</div>
        </div>

        <div className="item-col item-col-category no-overflow">
          <div className="item-heading">Created</div>
          <div className="no-overflow" style={{marginLeft:"50px"}}>
            <div>""</div>
          </div>
        </div>

        <div className="item-col fixed item-col-actions-dropdown" onClick={()=>setOpenSetting(!openSetting)}>
          <div className={ openSetting===true? "item-actions-dropdown active":"item-actions-dropdown"}>
            <a className="item-actions-toggle-btn">
              <span className="inactive">
                  <i className="fa fa-cog"></i>
              </span>
              <span className="active">
                  <i className="fa fa-chevron-circle-right"></i>
              </span>
            </a>
            <div className="item-actions-block" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <ul className="item-actions-list">
                <li>
                  <a className="remove" data-toggle="modal" data-target="#confirm-modal" onClick={handleDelete}>
                    <i className="fa fa-trash-o "></i>
                  </a>
                </li>
                <li>
                  <a className="invite"  onClick={()=>showModal()}>
                    <i className="fa-solid fa-share-from-square"></i>
                  </a>
                </li>
                <li>
                  {/*onClick={()=>navigate(`${EDIT_PRODUCT}`+`${index.ProId}`,{state:{index:index}})}*/}
                  <a className="edit">
                    <i className="fa fa-pencil"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <Modal title="Invite Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered>
        <EmailComponent onSubmit={() => setIsModalOpen(false)} code={null} url={null} name={null}/>
      </Modal>

    {/*  <ModalInvitePresentation id={"invite-modal"}/>*/}
    </li>
  )

}

export default PresentationCardComponent
