import barchart from "../../assets/image/chart.png"
import {Input, List} from "antd"
import React, {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Bar} from 'react-chartjs-2';
import {Button, Card, Col, Divider, Dropdown, Layout, Row} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartDataLabels
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
        datalabels: {
            display: true,
            color: 'black'
        }
    },

    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            display: false,
            grid: {
                display: false
            },
            ticks: {
                display: false
            },
        }
    }
};


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


const Presentation = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const [slideList, setListSlide] = useState([
        {
            "key": 0,
            "question": "Your question",
            "type": "barChart",
            "preview": barchart,
            "content": {
                labels: ["First", "Second", "Third", "Fourth"],
                datasets: [
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
                    "key": slideList.length,
                    "type": "barChart",
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
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleAddButton = () => {
        let lable = slideList[selectedItem]["content"]["labels"].concat(["New option"])
        let data = slideList[selectedItem]["content"]["datasets"][0]["data"].concat([0])
        slideList[selectedItem]["content"]["labels"] = lable
        slideList[selectedItem]["content"]["datasets"][0]["data"] = data
        let tempList = slideList.concat()
        setListSlide(tempList)
    }

    const handleRemoveButton = (index) => {
        let lable = slideList[selectedItem]["content"]["labels"]
        let data = slideList[selectedItem]["content"]["datasets"][0]["data"]
        slideList[selectedItem]["content"]["labels"] = lable.filter((_,i) => i !== index)
        slideList[selectedItem]["content"]["datasets"][0]["data"] = data.filter((_,i) => i!==index)
        let tempList = slideList.concat()
        setListSlide(tempList)
    }

    const onChangeInput = (index) => (e) => {
        let lable = [...slideList[selectedItem]["content"]["labels"]]
        lable[index] = e.target.value
        slideList[selectedItem]["content"]["labels"] = lable
        let tempList = slideList.concat()
        setListSlide(tempList)
    }

    const onChangeQuestion = (e) => {
        slideList[selectedItem]["question"] = e.target.value
        let tempList = slideList.concat()
        setListSlide(tempList)
    }

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
                            renderItem={(item) => (
                                <Card onClick={() => handleClickItem(item.key)} style={{
                                    backgroundColor: item.key === selectedItem ? "lightblue" : "white",
                                    margin: "10px",
                                    border: "solid"
                                }}>
                                    <List.Item
                                        key={item.key}
                                    >
                                        <Row>
                                            <Col>
                                                <text>
                                                    {item.key}
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
                            )}
                        />
                    </Sider>
                    <Content style={{backgroundColor: "white", margin: "10px", padding: "10px"}}>
                        <b style={{fontSize: 25}}>
                            {slideList[selectedItem].question == "" ? "Your question" : slideList[selectedItem].question}
                        </b>

                        {slideList[selectedItem].type === "barChart" ?
                            <Bar options={options} data={slideList[selectedItem].content}
                                 style={{position: "absolute", top: "50%"}}/> : <div/>}
                    </Content>
                    <Sider style={{backgroundColor: "white", padding: "20px", overflowY: "scroll"}} width={"400px"}>

                        <text>
                            Question
                        </text>
                        <Input size={"large"} allowClear placeholder={"Type your question"} maxLength={150} showCount onChange = {onChangeQuestion}/>

                        <div style={{height: "10px"}}/>

                        <text>
                            Options
                        </text>

                        {
                            slideList[selectedItem].content.labels.map((value, index) => {
                                return (
                                    <List.Item key={index}>
                                        <List.Item.Meta
                                            title={<Input size={"large"} defaultValue={value} onChange = {onChangeInput(index)}/>}
                                            style={{marginRight: "5px"}}
                                        />
                                        <Button icon={<CloseOutlined/>} onClick={() => handleRemoveButton(index)}/>
                                    </List.Item>
                                )
                            })
                        }


                        {/*<div/>*/}

                        <Button icon={<PlusOutlined/>} onClick={handleAddButton}> Add option</Button>

                    </Sider>
                </Layout>
                <Footer></Footer>

            </Layout>
        </>

    );
}

export default Presentation