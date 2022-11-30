import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, Row, Skeleton} from "antd";
import {Col} from "react-bootstrap";
import GroupCard from "../../components/card/groupcard/GroupCard";

import request from "../../apis/request";
import {LIST_GROUP_CREATED_API, LIST_GROUP_JOINED_API} from "../../configs/url";
import {getListGroup} from "../../apis/group/groupApi";
import {useSelector} from "react-redux";

const GroupContent = (type) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const {profile} = useSelector(state => state.loginPage);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        getListGroup({type:type,email:profile.email}).then((response) => {
            if (response.status == 200) {
                console.log(response.data)
                setData(response.data)
            }
            setLoading(false)
        })

    };

    useEffect(() => {
        loadMoreData()

    }, []);

    return (
      data.length > 0 ?
        <InfiniteScroll
          dataLength={data.length}
          loader={
              <Skeleton
                paragraph={{
                    rows: 5,
                }}
              />
          }
          endMessage={<Divider plain>End</Divider>}
          scrollableTarget="scrollableDiv"
        >
            <Row className="m-2">
                {data?.map((value, index, array) =>{
                    return (<Col xs={12} sm={12} lg={4} md={6} xl={4} style={{paddingBottom: 10}}>
                        <GroupCard name={value.name} url={value.url} type={value.type} capacity={value.capacity}
                                   code={value.code} question={value.question} userRoom={value.userRoom} typeRoom={type}/>
                    </Col>)}
                )
                }
            </Row>
        </InfiniteScroll> :
        <h1 className="text-center">
            Empty
        </h1>
    );
}

export default GroupContent