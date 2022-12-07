import {Button, Input, List, Space} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import { useCallback } from 'react'

const ChartSider = ({selectedItem, list, setListSlide}) => {

    const onChangeQuestion = (e) => {
        list[selectedItem]["text"] = e.target.value
        let tempList = list.concat()
        setListSlide(tempList)
    }

    const handleAddButton = () => {
        list[selectedItem]["content"]["labels"] = [...list[selectedItem]["content"]["labels"], "New option"]
        let datasets = list[selectedItem]["content"]["datasets"];
        let data = [...datasets[0]["data"], 0]
        datasets[0]["data"] = data
        list[selectedItem]["content"]["datasets"] = datasets
            let tempList = list.concat()
        setListSlide(tempList)
    }

    const handleRemoveButton = (index) => {
        let lable = list[selectedItem]["content"]["labels"]
        let data = list[selectedItem]["content"]["datasets"][0]["data"]
        list[selectedItem]["content"]["labels"] = lable.filter((_, i) => i !== index)
        list[selectedItem]["content"]["datasets"][0]["data"] = data.filter((_, i) => i !== index)
        let tempList = list.concat()
        setListSlide(tempList)
    }

    const onChangeOption = (index) => (e) => {
        let lable = [...list[selectedItem]["content"]["labels"]]
        lable[index] = e.target.value
        list[selectedItem]["content"]["labels"] = lable
        let tempList = list.concat()
        setListSlide(tempList)
    }


    return (
        <Space direction={"vertical"} size={"small"}>

            <text>
                Question
            </text>
            <Input size={"large"} allowClear placeholder={"Type your question"} maxLength={150}
                   showCount
                   value = {list[selectedItem].text}
                   onChange={onChangeQuestion}/>

            <div style={{height: "10px"}}/>

            <text>
                Options
            </text>

            {/*{*/}
            {/*    list[selectedItem].content.labels.map((value, index) => {*/}
            {/*        return (*/}
            {/*            <List.Item key={index}>*/}
            {/*                <List.Item.Meta*/}
            {/*                    title={<Input size={"large"} value={value}*/}
            {/*                                  onChange={onChangeOption(index)}/>}*/}
            {/*                    style={{marginRight: "5px"}}*/}
            {/*                />*/}
            {/*                <Button icon={<CloseOutlined/>}*/}
            {/*                        onClick={() => handleRemoveButton(index)}/>*/}
            {/*            </List.Item>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}

            <Button icon={<PlusOutlined/>} onClick={handleAddButton}> Add option</Button>
        </Space>
    );
}

export default ChartSider