import Carousel from "react-elastic-carousel";
import CardComponent from "../card/CardComponent";
import {Col, Row} from "react-bootstrap";
import React from "react";
import {Button} from "antd";
import {Link, useNavigate} from 'react-router-dom';

const items = [
  1, 2, 3, 4, 5
]

const breakPoints = [
  {width: 1, itemsToShow: 1},
  {width: 550, itemsToShow: 2, itemsToScroll: 2},
  {width: 768, itemsToShow: 3},
  {width: 1200, itemsToShow: 4}
];

const GroupComponent=({title})=>{
  const navigate = useNavigate();
  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <h3 style={{fontWeight: "350", textAlign: "center"}}>
          {title}
        </h3>
        <text style={{textAlign: "center"}}>
          The more groups you join the more you can explore
        </text>
      </div>
      <Carousel breakPoints={breakPoints}>
        {items.map(item => <CardComponent/>
        )}
      </Carousel>
      <div className="row justify-content-center mt-3">
        <Button onClick={()=>navigate('/group')} className="card__description__btn ant-btn ant-btn-primary" style={{padding:"12px 25px"}} >See more</Button>
      </div>

      <div className="m-5 ant-divider"/>
    </div>
  )
}
export default GroupComponent