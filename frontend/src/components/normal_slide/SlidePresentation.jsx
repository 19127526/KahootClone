import {Space} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";

const SlidePresentation = ({item}) => {
    return (
        <Space
            direction={item.content["image"] == "" ? "vertical" : "horizontal"}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width:"100%"
            }}>

            <div>
                <Paragraph style={{fontSize: 25, textAlign: "center", fontWeight: "bold"}}>
                    {item.content["heading"]}
                </Paragraph>
                <Paragraph style={{textAlign: "center"}}>
                    {item.content["paragraph"]}
                </Paragraph>
            </div>
        </Space>
    );
}

export  default SlidePresentation