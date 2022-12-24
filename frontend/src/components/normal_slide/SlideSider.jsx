import {Input, Space} from "antd";
import React, {useEffect, useState} from "react";
import {changeQuestion, updateHeader} from "../../apis/slide/slideAPI";

const SlideSider = ({selectedItem,selectedValue, setSelectedValue}) => {
    // console.log(selectedValue)

    const onBlurHeader = (e) => {
        updateHeader({id: selectedValue.id, heading:e.target.value, text: selectedValue.text}).then(() => {
        })
    }

    const onBlurParagraph = (e) => {
        updateHeader({id: selectedValue.id, text: e.target.value, heading:selectedValue.heading}).then(() => {
        })
    }


    const onChangeHeader = (e) => {
        setSelectedValue(prevState => ({
            ...prevState,
            heading: e.target.value
        }));
    }
    const onChangeParagraph = (e) => {
        setSelectedValue(prevState => ({
            ...prevState,
            text: e.target.value
        }));
    }

    useEffect(() => {
        setSelectedValue(selectedValue)
    }, [onBlurParagraph, onChangeParagraph])

    
    return (
        <Space direction={"vertical"} style={{width: "100%"}}>
            <b>
                Heading
            </b>
            <Input size={"large"}
                   value = {selectedValue.heading}
                   onBlur={onBlurHeader}
                   allowClear placeholder={"Type your header"} maxLength={150}
                   showCount onChange={onChangeHeader}/>
            <b>
                Paragraph
            </b>
            <Input size={"large"} allowClear placeholder={"Type your paragraph"} maxLength={800}
                   value = {selectedValue.text}
                   onBlur={onBlurParagraph}
                   showCount onChange={onChangeParagraph}/>
        </Space>
    );
}
export default SlideSider