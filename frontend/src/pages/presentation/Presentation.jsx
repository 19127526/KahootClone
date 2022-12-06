import barchart from "../../assets/img/chart.png"
import slide from "../../assets/img/slide.png"
import {Input, List, Space, Typography} from "antd"
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
import {Container} from "react-bootstrap";
import Paragraph from "antd/lib/typography/Paragraph";

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
          "key": slideList.length,
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
            "key": slideList.length,
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

  const handleAddButton = () => {
    slideList[selectedItem]["content"]["labels"] = [...slideList[selectedItem]["content"]["labels"], "New option"]
    let datasets = slideList[selectedItem]["content"]["datasets"];
    let data = [...datasets[0]["data"], 0]
    datasets[0]["data"] = data
    slideList[selectedItem]["content"]["datasets"] = datasets
    let tempList = slideList.concat()
    setListSlide(tempList)
  }

  const handleRemoveButton = (index) => {
    let lable = slideList[selectedItem]["content"]["labels"]
    let data = slideList[selectedItem]["content"]["datasets"][0]["data"]
    slideList[selectedItem]["content"]["labels"] = lable.filter((_, i) => i !== index)
    slideList[selectedItem]["content"]["datasets"][0]["data"] = data.filter((_, i) => i !== index)
    let tempList = slideList.concat()
    setListSlide(tempList)
  }

  const onChangeOption = (index) => (e) => {
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

  const onChangeHeader = (e) => {
    slideList[selectedItem]["content"]["heading"] = e.target.value
    let tempList = slideList.concat()
    setListSlide(tempList)
  }

  const onChangeParagraph = (e) => {
    slideList[selectedItem]["content"]["paragraph"] = e.target.value
    let tempList = slideList.concat()
    setListSlide(tempList)
  }

  return (
    <>
      <Divider/>
      <Layout style={{height: "100%", width:"100%",padding: "40px 10px 0 10px"}}>
        <Header style={{backgroundColor: "white", marginBottom: "10px",position:"relative"}}>
          <Dropdown
            menu={menuProps}
            arrow
          >
            <Button type={"primary"} icon={<PlusOutlined/>} size={"large"}
                    onClick={(e) => e.preventDefault()}
            style={{position:"absolute",top:"50%",left: "7%",transform: "translate(-50%, -50%)"}}>
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
                <Dropdown menu={menuProps} trigger={["contextMenu"]}>
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
                            {item.key + 1}
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
                </Dropdown>
              )}
            />
          </Sider>
          <Content style={{backgroundColor: "white", margin: " 0 10px 0 10px", padding: "10px"}}>

            {
              slideList[selectedItem].type === "chart" ?
                <Space direction={"vertical"} align={"center"} size={"large"}  style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width:"100%",
                }}>
                  <Typography style={{fontSize: 25}}>
                    {slideList[selectedItem].question == "" ? "Your question" : slideList[selectedItem].question}
                  </Typography>

                  <Bar options={options} data={slideList[selectedItem].content}
                       style={{minWidth: "80vh"}}
                  />
                </Space>
                : <Space
                  direction={slideList[selectedItem].content["image"] == "" ? "vertical" : "horizontal"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width:"100%"
                  }}>

                  <div>
                    <Paragraph style={{fontSize: 25, textAlign: "center", fontWeight: "bold"}}>
                      {slideList[selectedItem].content["heading"]}
                    </Paragraph>
                    <Paragraph style={{textAlign: "center"}}>
                      {slideList[selectedItem].content["paragraph"]}
                    </Paragraph>
                  </div>
                </Space>

            }


          </Content>
          <Sider style={{backgroundColor: "white", padding: "20px", overflowY: "scroll"}} width={"400px"}>
            {slideList[selectedItem].type === "chart" ?
              <Space direction={"vertical"} size={"small"}>

                <text>
                  Question
                </text>
                <Input size={"large"} allowClear placeholder={"Type your question"} maxLength={150}
                       showCount
                       onChange={onChangeQuestion}/>

                <div style={{height: "10px"}}/>

                <text>
                  Options
                </text>

                {
                  slideList[selectedItem].content.labels.map((value, index) => {
                    return (
                      <List.Item key={index}>
                        <List.Item.Meta
                          title={<Input size={"large"} defaultValue={value}
                                        onChange={onChangeOption(index)}/>}
                          style={{marginRight: "5px"}}
                        />
                        <Button icon={<CloseOutlined/>}
                                onClick={() => handleRemoveButton(index)}/>
                      </List.Item>
                    )
                  })
                }


                {/*<div/>*/}

                <Button icon={<PlusOutlined/>} onClick={handleAddButton}> Add option</Button>
              </Space> : <Space direction={"vertical"} style={{width: "100%"}}>
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
              </Space>}

          </Sider>
        </Layout>
        <Footer></Footer>

      </Layout>
    </>

  );
}

export default Presentation