import React from "react";
import "./Card.css"
import {useNavigate} from "react-router-dom";

const CardComponent=({ name, img, id }) =>{
  const detail="the descriptions is the descriptions is the descriptiondsdshe descriptions is the descripdsdsdsdsdt";
  console.log(detail.length);
  const navigate = useNavigate();
  return (
    <a href="#" className="card">
      <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" className="card__image" alt=""/>
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
            <path/>
          </svg>
          <img className="card__thumb" src="https://joeschmoe.io/api/v1/random" alt=""/>
          <div className="card__header-text">
            <h3 className="card__title">Jessica Parker</h3>
          </div>
        </div>
        <p className="card__description">
          {detail.length>=90?
            <div>
              <span className="card__description__detail">{detail.substring(0,90)}...</span>
            </div>
            :
            <span className="card__description__detail">{detail}</span>
          }
          <div style={{padding:"10px"}}>
            <button className="card__description__btn ant-btn ant-btn-primary" onClick={()=>navigate("/group/detail")}>See detail</button>
          </div>
        </p>
      </div>
    </a>
  )
}



export default CardComponent;
