import React from "react";
import {useNavigate} from "react-router-dom";
import {CREATED_GROUP_URI, JOINED_GROUP_URI, PRESENTATION_URI} from "../../configs/url";


function AsideComponent({ onClose }) {
  const navigate=useNavigate();
  return (<>

    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="brand"
               style={{backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="logo">
              <span className="l l1"></span>
              <span className="l l2"></span>
              <span className="l l3"></span>
              <span className="l l4"></span>
              <span className="l l5"></span>
            </div>
            <a className="navbar-brand text-brand" >Slide<span className="color-b">Clone</span></a>
          </div>
        </div>
        <nav className="menu">
          <ul className="sidebar-menu metismenu" id="sidebar-menu">
            <li id="dashboard">
              <a onClick={()=>navigate("/")}>
                <i className="fa fa-home"></i> Dashboard </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-area-chart"></i> Groups
                &nbsp;&nbsp; &nbsp;
                <i className="fa arrow"></i>
              </a>
              <ul className="sidebar-nav">
                <li  onClick={()=>navigate(CREATED_GROUP_URI)}>
                  <a> Created Groups </a>
                </li>
                <li  onClick={()=>navigate(JOINED_GROUP_URI)}>
                  <a> Joined Groups </a>
                </li>
              </ul>
            </li>
            <li id="managementProduct">
              <a onClick={()=>navigate(PRESENTATION_URI)}>
                <i className="fa fa-th-large">
                </i> Presentations
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <div className="modal fade" id="addCategory">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <i className="fa fa-opera"></i> Thêm danh mục cha</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="form-inline">
              <div className="input-group">
                <input type="text" className="form-control boxed rounded-s" style={{width: "400px"}}
                       placeholder="Tên danh mục..."/>
                <span className="input-group-btn align-content-center">
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button">
                Hủy bỏ
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button">
                Thêm
                </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default AsideComponent;
