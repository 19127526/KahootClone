import {Space} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
import Title from "antd/es/typography/Title";
import Parser from 'html-react-parser';

const SlidePresentation = ({selectedValue, height, width}) => {
    return (
        <Space
            direction={"vertical"}
            style={{
                // overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: height ?? "100%",
                width: width ?? "100%"
            }}>

            <div>
                <Title>
                    {selectedValue.heading}
                </Title>
                <Paragraph  >
                  {Parser(selectedValue.text)}
                </Paragraph>
            </div>
        </Space>
    );
}

export  default SlidePresentation