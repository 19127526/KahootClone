import {Space} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
import Title from "antd/es/typography/Title";
import Parser from 'html-react-parser';

const SlidePresentation = ({selectedValue}) => {
    return (
        <Space
            direction={"vertical"}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width:"100%"
            }}>

            <div>
                <Title>
                    {selectedValue.heading}
                </Title>
                <Paragraph style={{textAlign: "center"}} >
                  {Parser(selectedValue.text)}
                </Paragraph>
            </div>
        </Space>
    );
}

export  default SlidePresentation