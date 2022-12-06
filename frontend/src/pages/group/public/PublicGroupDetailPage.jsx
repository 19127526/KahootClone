import PresentationCardComponent from "../../../components/group/public/PresentationCardComponent";
import React from "react";

const ModalAddPresenTation=({id})=>{
  return (
    <div className="modal fade" id={id} >
      <div className="modal-dialog" role="document" style={{top:"30%"}}>
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
                       placeholder="Enter name presentation..."/>
                <span className="input-group-btn align-content-center" style={{marginTop:"5px"}}>
                <button className="btn btn-secondary  rounded-s" data-dismiss="modal" type="button" style={{marginRight:"5px"}}>
                Cancel
                </button>
                <button className="btn btn-primary rounded-s" data-dismiss="modal" type="button">
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
const PublicGroupDetailPage=()=>{
  const item=[];
  for(let i=0;i<6;i++){
    item.push({
      ImageMain: "dsd",
      ProName:"education other",
      TotalPrice:"dsd",
      StatusPro:"dsd",
      Quantity:"dsd",
      DateStart:"dsd"
    })
  }

  return(
    <article className="content items-list-page">
      <div className="title-search-block">
        <div className="title-block">
          <div className="row">
            <div className="col-md-6">
              <h3 className="title"> List Presentation &nbsp;
                <a  className="btn btn-primary btn-sm rounded-s"  data-toggle="modal" data-target="#addPresentation"> Add
                  New </a>
                <ModalAddPresenTation id={"addPresentation"}/>
                <div className="action dropdown">
                  <button className="btn  btn-sm rounded-s btn-secondary dropdown-toggle" type="button"
                          id="dropdownMenu1"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> More actions...
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-pencil-square-o icon"></i>Mark as a draft</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#confirm-modal">
                      <i className="fa fa-close icon"></i>Delete</a>
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
                <div  style={{marginLeft:"10px"}}>
                  <span>Name</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-author">
                <div style={{marginRight:"45px"}}>
                  <span>Owner</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-date">
                <div className="no-overflow" style={{marginRight:"45px"}}>
                  <span>Modified</span>
                </div>
              </div>
              <div className="item-col item-col-header item-col-category">
                <div className="no-overflow" >
                  <span>Created</span>
                </div>
              </div>
            </div>
          </li>
          {
            item.map(index => (
              <PresentationCardComponent index={index}/>
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
  )
}

export default PublicGroupDetailPage