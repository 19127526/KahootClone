import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import OwnerCard from "../../card/member/OwnerCard";
import {getDetailGroup} from "../../../apis/group/groupApi";
import {useLocation} from "react-router-dom";
import MemberCard from "../../card/member/MemberCard";
import emailjs from "@emailjs/browser";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {INVITE_URL_REDIRECT} from "../../../configs/url";
import {Input, Pagination} from "antd";

const ModalAddMember = ({idModal, userName, nameGroup, code, id}) => {
  const [email, setEmail] = useState();
  const form = useRef();
  const handleInviteMember = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_r2vgzud', 'template_6dknugv', form.current, 'KZ2451QXsxFbGeSSS')
      .then((result) => {
        console.log("sent");
        Notification("Thông báo email", "Gửi lời mời thành công", constraintNotification.NOTIFICATION_SUCCESS)
      }, (error) => {
        Notification("Thông báo email", error.text, constraintNotification.NOTIFICATION_WARN)
        console.log(error.text);
      })
      .catch(() => {
      })
    ;
  }
  return (
    <div className="modal fade " id={idModal}>
      <div className="modal-dialog" role="document" style={{top: "30%"}}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-opera"></i> Add Member</h4>
            <button type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div className="modal-body">
              <form className="form-inline" ref={form} onSubmit={handleInviteMember}>
                <div className="input-group">
                  <input type="email" name="user_email" className="form-control boxed rounded-s"
                         style={{width: "400px"}}
                         placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
                  <input type="text" name="user_name" value={userName} style={{display: "none"}}/>
                  <input type="text" name="user_group" value={nameGroup} style={{display: "none"}}/>
                  <input type="text" name="user_link_redirect"
                         value={INVITE_URL_REDIRECT + "/" + email + "/" + code + "/" + id} style={{display: "none"}}/>
                  <Input type="text" name="user_link" value={""} style={{display: "none"}}/>
                  <span className="input-group-btn align-content-center" style={{marginTop: "5px"}}>
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button"
                        style={{marginRight: "5px"}}>
                Cancel
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" onClick={handleInviteMember}>
                Add
                </button>
                </span>
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const pageIndex = 6;
const ListMemberPresentationComponent = () => {
  const [item, setItem] = useState([]);
  const [tempItem,setTempItem]=useState([]);
  const location = useLocation();
  const splitType = location.pathname.split("/")
  const id = splitType[splitType.length - 1]
  const dataProfile = useSelector(state => state.loginPage);
  const email = dataProfile.profile.email;
  const [isOwner, setIsOwner] = useState(false);
  const [detailGroup, setDetailGroup] = useState();
  const [page, setPage] = useState(1);
  const [searchEmail,setSearchEmail]=useState();
  const currentIndexPage = pageIndex * page;
  const prevIndexPage = pageIndex * (page - 1);
  useEffect(() => {
    getDetailGroup({email: email, id: id}).then(res => {
      setIsOwner(res.data.created === email)
      setItem(res.data.users);
      setTempItem(res.data.users)
      setDetailGroup(res.data);
    })
      .catch(err => {
      })
  }, [])

  const handleSearchEmail=()=>{
    const resultSearch=tempItem.filter(index=>index.email.includes(searchEmail));
    if(resultSearch.length===0){
      setItem([]);
    }
    else if(searchEmail=="")
    {
      setItem(tempItem);
    }
    else{
      setItem(resultSearch);
    }
  }

  return (
    <div>
      <div className="title-search-block">
        <div className="title-block">
          <div className="row">
            <div className="col-md-6">
              <h3 className="title"> List Member &nbsp;
               <a className="btn btn-primary btn-sm rounded-s" data-toggle="modal"
                              data-target="#addPresentation"> Add
                  New </a>
                <ModalAddMember idModal={"addPresentation"}
                                id={detailGroup?.id}
                                code={detailGroup?.code}
                                userName={detailGroup?.created}
                                nameGroup={detailGroup?.name}
                />
              </h3>
              <p className="title-description">List member in group </p>
            </div>
          </div>
        </div>
        <div className="items-search">
          <form className="form-inline">
            <div className="input-group">
              <input type="text" className="form-control boxed rounded-s" placeholder="Search email...." onChange={(e)=>setSearchEmail(e.target.value)}/>
              <span className="input-group-btn">
                  <button className="btn btn-secondary rounded-s" type="button" style={{height:"100%"}} onClick={handleSearchEmail}>
                      <i className="fa fa-search"></i>
                  </button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="card items">
        <ul className="item-list striped">
          <li className="item item-list-header">
            <div className="item-row">
              <div className="item-col item-col-header item-col-title">
                <div>
                  <span>Name</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-author">
                <div className="no-overflow">
                  <span>Role</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-date">
                <div style={{marginRight: "49px"}}>
                  <span>Email</span>
                </div>
              </div>
            </div>
          </li>


          {
            isOwner ? item.map((value, index) => {
              return prevIndexPage <= index && index < currentIndexPage ? (
                <OwnerCard owner={email} id={id} email={value.email} role={value.role}
                           userMame={value.userName} setItem={setItem}/>) : ""
            }) : item.map((value, index) => {
              return prevIndexPage <= index && index < currentIndexPage ? (
                <MemberCard email={value.email} role={value.role}
                            userMame={value.userName}/>) : ""
            })
          }
        </ul>
      </div>
      <nav className="text-right" style={{display:"flex",justifyContent:"center",marginTop:"3%"}}>
        <ul className="pagination">
          <Pagination total={item.length} current={page} defaultCurrent={1}  pageSize={pageIndex}  showSizeChanger={false} onChange={(pageindex)=>setPage(pageindex)} />
        </ul>
      </nav>
    </div>
  )
}


export default ListMemberPresentationComponent