import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Notification from "../../../components/notification/Notification";
import * as constraintNotification from "../../../components/notification/Notification.constraints"
import {addNewPresentation, getListPresentation} from "../../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import PresentationCardComponent from "../../../components/group/public/PresentationCardComponent";

const ModalAddPresenTation = ({id, list, setData}) => {
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
            addNewPresentation({groupID: params.groupId, email: email, name: value}).then((response) => {
                if (response.status === 201) {
                    let newList = [...list]
                    newList.push(response.data)
                    setData(newList)
                    Notification("Success", "Add Presentation success", constraintNotification.NOTIFICATION_SUCCESS)
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
const PublicGroupDetailPage = () => {
    const location = useLocation();
    const splitType = location.pathname.split("/")
    const type = splitType[splitType.length - 1]
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const params = useParams();

    const loadData = () => {
        setLoading(true)
        setData([])
        getListPresentation({type: type, groupID: params.groupId}).then((response) => {

            if (response.status == 200) {
                setData(response.data)
                console.log(response.data)
            } else {

            }
        })
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [params.groupId]);


    return (
      <>



          //Presentation
            <article className="content items-list-page">
            <div className="title-search-block">
                <div className="title-block">
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="title"> List Presentation &nbsp;
                                <a className="btn btn-primary btn-sm rounded-s" data-toggle="modal"
                                   data-target="#addPresentation"> Add
                                    New </a>
                                <ModalAddPresenTation id={"addPresentation"} setData={setData} list={data}/>
                                <div className="action dropdown">
                                    <button className="btn  btn-sm rounded-s btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu1"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> More
                                        actions...
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <a className="dropdown-item" href="#">
                                            <i className="fa fa-pencil-square-o icon"></i>Mark as a draft</a>
                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                           data-target="#confirm-modal">
                                            <i className="fa fa-close icon" ></i>Delete</a>
                                    </div>
                                </div>
                            </h3>
                            <p className="title-description">List presentation in group </p>
                        </div>
                    </div>
                </div>
                <div className="items-search">
                    <form className="form-inline">
                        <div className="input-group">
                            <input type="text" className="form-control boxed rounded-s" placeholder="Search for..."/>
                            <span className="input-group-btn">
                  <button className="btn btn-secondary rounded-s" type="button">
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
                            <div className="item-col fixed item-col-check">
                                <label className="item-check" id="select-all-items">
                                    <input type="checkbox" className="checkbox"/>
                                    <span></span>
                                </label>
                            </div>
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
                                    <span>Modified</span>
                                </div>
                            </div>
                            <div className="item-col item-col-header item-col-category">
                                <div className="no-overflow">
                                    <span>Created</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {
                        data.length === 0 ? <div style={{textAlign: "center", padding: "5%"}}>
                                Empty
                            </div> :
                            data.map((value) => (
                                <PresentationCardComponent index={value} setData={setData} list={data}/>
                            ))
                    }
                </ul>
            </div>
            <nav className="text-right">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#"> Prev </a>
                </li>

                <li className="page-item active">
                  <a className="page-link" href="#"> 1 </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#"> 2 </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#"> 3 </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#"> 4 </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#"> 5 </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#"> Next </a>
                </li>
              </ul>
            </nav>
        </article>

      </>
    )
}

export default PublicGroupDetailPage