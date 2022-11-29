import Carousel from "react-elastic-carousel";
import CardComponent from "../card/cardcomponent/CardComponent";
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {Link, useNavigate} from 'react-router-dom';
import request from "../../apis/request";
import {LIST_GROUP_CREATED_API, LIST_GROUP_JOINED_API} from "../../configs/url";

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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const loadMoreData = () => {
        if (loading) {
            return;
        }

        setLoading(true);
        request.get(title == "Joined Groups" ? LIST_GROUP_JOINED_API : LIST_GROUP_CREATED_API  + "?email=huylol").then((response) => {
            if (response.status == 200) {
                setData(response.data)
            }
            setLoading(false)
        })

    };

    useEffect(() => {
        loadMoreData()

    }, []);


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
        {data.length > 0 ?
      <Carousel breakPoints={breakPoints}>
        {data.map(item => <CardComponent name={item.name} url={item.url}/>
        )}
      </Carousel> : <div></div>}
      <div className="row justify-content-center mt-3">
        <Button onClick={()=>navigate('/group')} className="card__description__btn ant-btn ant-btn-primary" style={{padding:"12px 25px"}} >{data.length > 0 ? "See more" : "Create group"}</Button>
      </div>

      <div className="m-5 ant-divider"/>
    </div>
  )
}
export default GroupComponent