import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Divider, Row, Skeleton} from "antd";
import {Col} from "react-bootstrap";
import GroupCard from "../../components/card/GroupCard";
import request from "../../apis/request";
import {LIST_GROUP_CREATED_API, LIST_GROUP_JOINED_API} from "../../configs/url";

const contents = [1, 2, 3, 4, 5];

const GroupContent = (type) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }

        setLoading(true);
        request.get(type == "joined" ? LIST_GROUP_JOINED_API : LIST_GROUP_CREATED_API  + "?email=phamtienquan2001@gmail.com").then((response) => {
            // console.log(response)
            if (response.status == 200) {
                setData(response.data)
                console.log(response.data)
                console.log(data)
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
                {data?.map((value, index, array) =>
                    <Col xs={12} sm={12} lg={4} md={6} xl={4} style={{paddingBottom: 10}}>
                        <GroupCard name={value.name} url={value.url} type={value.type} capacity={value.capacity}
                                   code={value.code} question={value.question} userRoom={value.userRoom}/>
                    </Col>
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