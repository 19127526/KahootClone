import CardGroupComponent from "../../../components/card/publicgroup/CardGroupComponent";
import React, {useEffect, useState} from "react";
import {addNewPresentation} from "../../../apis/presentation/presentationAPI";
import Notification from "../../../components/notification/Notification";
import * as constraintNotification from "../../../components/notification/Notification.constraints";
import request from "../../../apis/request";
import {CREATE_GROUP, LIST_GROUP_CREATED_API, LIST_GROUP_JOINED_API} from "../../../configs/url";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


const ModalAddGroup = ({id,setIsAdd}) => {
  const [nameGroup,setNameGroup]=useState("");
  const dataProfile=useSelector(state=> state.loginPage);
  const email=dataProfile.profile.email;

  const clickAddGroup=()=>{
    request.post(CREATE_GROUP,{nameGroup:nameGroup,email:email})
      .then(res=>{
        if(res.status===201){
          Notification("Notification about adding group","Added group success !!", constraintNotification.NOTIFICATION_SUCCESS)
        }
        else if(res.response.status===400){
          Notification("Notification about adding group",res.response.data.message, constraintNotification.NOTIFICATION_ERROR)
        }
        else{
          Notification("Notification about adding group","Added group fail !!", constraintNotification.NOTIFICATION_ERROR)
        }
       })
      .catch(err=>{
        Notification("Notification about adding group","Added group fail !!", constraintNotification.NOTIFICATION_ERROR)
      })
      .finally(()=>{
        setIsAdd()
      })
  }

  const onChangeGroup=(e)=>{
    setNameGroup(e.target.value)
  }

  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog" role="document" style={{top: "30%"}}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-opera"></i> Add Group</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-inline">
              <div className="input-group">
                <input type="text" className="form-control boxed rounded-s" style={{width: "400px"}}
                       placeholder="Enter name group..." defaultValue={""} onChange={onChangeGroup}
                      />
                <span className="input-group-btn align-content-center" style={{marginTop: "5px"}}>
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button"
                        style={{marginRight: "5px"}} >
                Cancel
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button" onClick={clickAddGroup}>
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

const PublicGroupPage=()=>{
    const location=useLocation();
    const splitType = location.pathname.split("/")
    const type = splitType[splitType.length-1]
    const [listGroupCreated,setlistGroupCreated]=useState([])
  const dataProfile=useSelector(state=> state.loginPage);
  const email=dataProfile.profile.email;
  const[add,isAdd]=useState(false);
  useEffect(()=>{
    const getlistGroupCreated= async ()=>{
      await request.get(type === "created" ? LIST_GROUP_CREATED_API+`?email=${email}` : LIST_GROUP_JOINED_API+`?email=${email}`)
        .then(res=>{
          if(res.status===200){
            setlistGroupCreated(res.data);
            console.log(res.data)
          }
          else{

          }
        })
        .catch(err=>{})

    }
    getlistGroupCreated()
  },[add, type])

  return(
    <article className="content charts-morris-page">
      <div className="title-block">
        <div className="row">
            <div className="col-md-6">
              <h3 className="title"> {type === "created" ? "Created" : "Joined"} Groups&nbsp;
                  {type === "created" ?   <a className="btn btn-primary btn-sm rounded-s"
                                             data-toggle="modal" data-target="#addGroup"> Add
                      New </a> : <div/>}
              </h3>
              <p className="title-description">List group {type === "created" ? "is created" : "joined"}</p></div>
        </div>

        <ModalAddGroup id={"addGroup"} setIsAdd={()=>isAdd(!add)}/>

        <section className="section">
          <div className="row">
            {listGroupCreated.map(index=>(
              <div className="col-md-6" style={{padding:"10px"}}>
                <CardGroupComponent type={type} id={index.id} title={`Group: ${index.name}`} subTitle={index.description===null?"Group Slide Viet Nam":index.description}/>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}


export default PublicGroupPage