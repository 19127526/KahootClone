import PresentationCardComponent from "../public/PresentationCardComponent";
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {addNewPresentation, getInvitation, getListPresentation} from "../../../apis/presentation/presentationAPI";
import Notification from "../../notification/Notification";
import * as constraintNotification from "../../notification/Notification.constraints";
import {Pagination} from "antd";
import LoadingComponent from "../../loading/LoadingComponent";

const ModalAddPresenTation = ({id, loadData}) => {
  const [value, setValue] = useState("")
  const params = useParams();
  const dataProfile = useSelector(state => state.loginPage);
  const email = dataProfile.profile.email;
  const onChange = (e) => {
    setValue(e.target.value)
  }


  const handleCancel = () => {
    setValue("")
  }


  const handleOk = (e) => {
    e.preventDefault();
    if (value !== "") {
      addNewPresentation({email: email, name: value}).then((response) => {
        if (response.status === 201) {
          Notification("Success", "Add Presentation success", constraintNotification.NOTIFICATION_SUCCESS)
          loadData({type: "created"})
        } else {
          Notification("Error", "Add Presentation fail", constraintNotification.NOTIFICATION_WARN)
        }
      })
    } else {
      Notification("Error", "Name can't be empty", constraintNotification.NOTIFICATION_WARN)
    }
    setValue("")
  }

  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog" role="document" style={{top: "30%"}}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-opera"></i> Add Presentation</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-inline">
              <div className="input-group">
                <input type="text" className="form-control boxed rounded-s" style={{width: "400px"}}
                       placeholder="Enter name presentation..." defaultValue={""} value={value}
                       onChange={onChange}/>
                <span className="input-group-btn align-content-center" style={{marginTop: "5px"}}>
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button"
                        style={{marginRight: "5px"}} onClick={handleCancel}>
                Cancel
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button" onClick={handleOk}>
                Add
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

const pageIndex = 6;
const ListPresentationComponent=({type, data, loadData,setData, tempData})=>{


  const params = useParams();
  const [page, setPage] = useState(1);
  const currentIndexPage = pageIndex * page;
  const prevIndexPage = pageIndex * (page - 1);

  const [searchValue,setSearchValue]=useState("");









  const handleSearchClick=e=>{
    if(searchValue===""){
      setData(tempData);
    }
    else{
      const a=tempData.filter(index=> index?.name.includes(searchValue))
      setData(a);
    }
  }


  return (
    <div >
      <div className="title-search-block">
        <div className="title-block">
          <div className="row">
            <div className="col-md-6">
              <h3 className="title"> List Presentation &nbsp;
                {
                  type === "created" ? <a className="btn btn-primary btn-sm rounded-s" data-toggle="modal"
                                          data-target="#add"> Add
                    New </a> : <div/>
                }
                {
                  type === "created" ? <ModalAddPresenTation id={"add"} loadData={loadData}/>: <div/>
                }

              </h3>
              <p className="title-description">List presentation</p>
            </div>
          </div>
        </div>
        <div className="items-search">
          <form className="form-inline">
            <div className="input-group">
              <input type="text" className="form-control boxed rounded-s" placeholder="Search name ..." onChange={(e)=>setSearchValue(e.target.value)}/>
              <span className="input-group-btn" onClick={handleSearchClick}>
                  <button className="btn btn-secondary rounded-s" type="button" style={{height:"100%"}}>
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
                <div style={{marginLeft: "10px"}}>
                  <span>Name</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-author">
                <div style={{marginRight: "45px"}}>
                  <span>Owner</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-date">
                <div className="no-overflow" style={{marginRight: "45px"}}>
                  <span>Status</span>
                </div>
              </div>
            </div>
          </li>
          {
            data.length === 0 ? <div style={{textAlign: "center", padding: "5%"}}>
                Empty
              </div> :
              data.map((value,index) => prevIndexPage <= index && index < currentIndexPage ?  (

                <PresentationCardComponent index={value} loadData={loadData} type ={type}/>
              ) : "")
          }
        </ul>
      </div>
      <nav className="text-right" style={{display:"flex",justifyContent:"center",marginTop:"3%"}}>
        <ul className="pagination">
          <Pagination total={data.length} current={page} defaultCurrent={1}  pageSize={pageIndex}  showSizeChanger={false} onChange={(pageindex)=>setPage(pageindex)} />
        </ul>
      </nav>

    </div>
  )
}

export default ListPresentationComponent