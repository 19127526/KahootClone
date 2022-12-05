import {Input, Space} from "antd";
import React from "react";

const SlideSider = ({item, list, setListSlide}) => {

    const onChangeHeader = (e) => {
        item["content"]["heading"] = e.target.value
        let tempList = list.concat()
        setListSlide(tempList)
    }

    const onChangeParagraph = (e) => {
        item["content"]["paragraph"] = e.target.value
        let tempList = list.concat()
        setListSlide(tempList)
    }

    
    return (
        <Space direction={"vertical"} style={{width: "100%"}}>
            <b>
                Heading
            </b>
            <Input size={"large"}
                   allowClear placeholder={"Type your header"} maxLength={150}
                   showCount onChange={onChangeHeader}/>
            <b>
                Paragraph
            </b>
            <Input size={"large"} allowClear placeholder={"Type your paragraph"} maxLength={800}
                   showCount onChange={onChangeParagraph}/>
        </Space>
    );
}
export default SlideSider