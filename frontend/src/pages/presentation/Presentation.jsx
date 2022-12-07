import barchart from "../../assets/image/chart.png"
import slide from "../../assets/image/slide.png"
import {Input, List, Popover, Space} from "antd"
import React, {useState} from 'react';
import {Button, Card, Col, Divider, Dropdown, Layout, Row} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";
import ChartPresentation from "../../components/chart/ChartPresentation";
import ChartSider from "../../components/chart/ChartSider";
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import SlideSider from "../../components/normal_slide/SlideSider";
import {hover} from "@testing-library/user-event/dist/hover";


const items = [
    {
        label: <div>Chart</div>,
        key: '0',
    },
    {
        label: <div>Slide</div>,
        key: '1',
    },
];

const options = [
    {
        label: <div>Remove</div>,
        key: '0',
    },
];



const Presentation = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const [hoverItem, setHoverItem] = useState(0)
    const [slideList, setListSlide] = useState([
        {
            "question": "Your question",
            "type": "chart",
            "preview": barchart,
            "content": {
                "labels": ["First", "Second", "Third", "Fourth"],
                "datasets": [
                    {
                        label: 'Data',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'blue',
                    },
                ]
            }
        }
    ]);

    const handleClickItem = (index) => {
        setSelectedItem(index)
    }
    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                let list = slideList.concat([{
                    "type": "chart",
                    "preview": barchart,
                    "question": "Your question",
                    "content": {
                        labels: ["First", "Second", "Third", "Fourth"],
                        datasets: [
                            {
                                data: [0, 0, 0, 0],
                                backgroundColor: 'blue',
                            },
                        ]
                    }
                }])
                setListSlide(list)
                setSelectedItem(list.length - 1)
                break;
            default:
                let temp = slideList.concat([
                    {
                        "type": "slide",
                        "preview": slide,
                        "content": {
                            "heading": "Heading",
                            "paragraph": "Paragraph",
                            "image": "https://www.w3schools.com/w3css/img_lights.jpg"
                        }
                    }
                ]);
                setListSlide(temp)
                setSelectedItem(temp.length - 1)
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const removeSlide = () => {
        let list = [...slideList]
        list.splice(hoverItem, 1)
        setListSlide(list)
        console.log(list)
        console.log(hoverItem)
        if(hoverItem === 1 && list.length <= 1){
            setSelectedItem(0)
        } else {
            setSelectedItem(hoverItem < selectedItem ? selectedItem-1 : selectedItem)
        }
    }

    const handleAddButton = () => {
        slideList[selectedItem]["content"]["labels"] = [...slideList[selectedItem]["content"]["labels"], "New option"]
        let datasets = slideList[selectedItem]["content"]["datasets"];
        let data = [...datasets[0]["data"], 0]
        datasets[0]["data"] = data
        slideList[selectedItem]["content"]["datasets"] = datasets
        let tempList = slideList.concat()
        setListSlide(tempList)
    }

    const content = (
        <>
            <Button size={"large"} onClick={removeSlide} disabled={slideList.length === 1}>
                Remove
            </Button>
        </>
    );


    return (
        <>
            <Divider/>
            <Layout style={{height: "100vh"}}>
                <Header style={{backgroundColor: "white", marginBottom: "10px"}}>
                    <Dropdown
                        menu={menuProps}
                        arrow
                    >
                        <Button type={"primary"} icon={<PlusOutlined/>} size={"large"}
                                onClick={(e) => e.preventDefault()}>
                            Add slide
                        </Button>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider style={{backgroundColor: "white", overflowY: "scroll"}}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={slideList}
                            renderItem={(item, index) => (
                                <Popover placement="right" title="Menu" content={content} trigger={"contextMenu"} onOpenChange={(visible) =>{
                                    if(visible){
                                        setHoverItem(index)
                                    }
                                }}>
                                    <Card onClick={() => handleClickItem(index)} style={{
                                        backgroundColor: index === selectedItem ? "lightblue" : "white",
                                        margin: "10px",
                                        border: "solid"
                                    }}>
                                        <List.Item
                                            key={item.key}
                                        >
                                            <Row>
                                                <Col>
                                                    <text>
                                                        {index + 1}
                                                    </text>
                                                </Col>
                                                <Col>
                                                    <img src={item.preview} alt={""}/>
                                                    <text>
                                                        {item.type}
                                                    </text>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    </Card>
                                </Popover>

                            )}
                        />
                    </Sider>
                    <Content style={{backgroundColor: "white", margin: "10px", padding: "10px"}}>
                        {
                            slideList[selectedItem].type === "chart" ?
                                <ChartPresentation item={slideList[selectedItem]}/>
                                : <SlidePresentation item={slideList[selectedItem]}/>

                        }
                    </Content>
                    <Sider style={{backgroundColor: "white", padding: "20px", overflowY: "scroll"}} width={"400px"}>
                        {slideList[selectedItem].type === "chart" ?
                            <ChartSider selectedItem={selectedItem} list={slideList} setListSlide={setListSlide}/>
                            :
                            <SlideSider item={slideList[selectedItem]} list={slideList} setListSlide={setListSlide}/>
                        }

                    </Sider>
                </Layout>
                <Footer></Footer>

            </Layout>
        </>

    );
}

export default Presentation