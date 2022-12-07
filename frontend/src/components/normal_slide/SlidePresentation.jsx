import {Space} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
import Title from "antd/es/typography/Title";

const SlidePresentation = ({item}) => {
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
                    {item.content["heading"]}
                </Title>
                <Paragraph style={{textAlign: "center"}}>
                    {item.content["paragraph"]}
                </Paragraph>
            </div>
        </Space>
    );
}

export  default SlidePresentation