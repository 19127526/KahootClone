import {Input, List, Popover, Space} from "antd"
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Divider, Dropdown, Layout, Row} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";
import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import ChartSider from "../../components/chart/Sider/ChartSider";
import {getPresentationDetail} from "../../apis/presentation/presentationAPI";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {addNewSlide, deleteSlide} from "../../apis/slide/slideAPI";
import barchart from "../../assets/img/chart.png"
import slide from "../../assets/img/slide.png"
import {PRESENTATION_SHOW_URI, PRESENTATION_URI} from "../../configs/url";
import {useSelector} from "react-redux";
import LoadingExample from "../../components/loading/LoadingExample";


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
    const location = useLocation();

    const {id}=useParams();
    const navigate=useNavigate()
    const dataProfile = useSelector(state => state.loginPage);
    const email = dataProfile.profile.email;
    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedValue, setSelectedValue] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [hoverItem, setHoverItem] = useState(0)
    const [slideList, setListSlide] = useState([]);
    const [isConnected,setIsConnected]=useState(false)
    const [userData,setUserData]=useState({
        userName:"",
        receiverName:"",
        connected:false,
        message:""
    });
    const handleClickItem = (index) => {
        setSelectedValue(slideList[index])
        setSelectedItem(index)
    }
    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                addSlide({genre: "MULTI_CHOICES"})
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

    const removeSlide = async () => {
        let list = [...slideList]
        let deletedItem = list.splice(hoverItem, 1)
        await deleteSlide({id:deletedItem[0]["id"]});
        setListSlide(list)
        console.log(list)
        if(hoverItem === 1 && list.length <= 2){
            setSelectedItem(selectedItem > hoverItem ? 0 : 0)
        }
        else {
            setSelectedItem(hoverItem <= selectedItem ? selectedItem-1 : selectedItem)
        }

    }

    const addSlide = ({genre}) => {
        addNewSlide({id: id, question:"Your question", genre: genre}).then((response) => {
            if(response.status === 201){
                if(slideList.length === 0 ){
                    setListSlide([response.data])
                }
                else{
                    setListSlide([...slideList,response.data])
                }
                setSelectedValue(response.data)
                setSelectedItem(slideList.length-1)
            }

        })
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

    const presentButton=(e)=>{
        e.preventDefault();


        navigate(PRESENTATION_URI + `${id}/show`,{state:{index:slideList, firstSlide: slideList[0].id}})
    }

    useEffect(() => {
        setIsLoading(true)
        async function getDetail() {
            let response = await getPresentationDetail({id: id, email:email })
            if(response.status === 200){
                if(response.data.slides.length === 0){
                    addSlide()
                } else {
                    console.log(response.data.slides)
                    setSelectedValue(response.data.slides[0])
                    setListSlide(response.data.slides)
                }
            }
        }
        getDetail()
        setIsLoading(false)

    }, [])

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
                              style={{position:"absolute",top:"20%",left: "2.3%"}}>
                          Add slide
                      </Button>
                  </Dropdown>
                  <Button type={"primary"} size={"large"}
                          onClick={presentButton}
                          style={{position:"absolute",right:"3%",top:"20%"}}>
                      Present
                  </Button>
              </Header>
              <Layout>
                  <Sider style={{backgroundColor: "white", overflowY: "scroll"}}>
                      {slideList.length !== 0 ?  <List
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
                                              {/*<img src={barchart} alt={""}/>*/}
                                              <text>
                                                  {item.type}
                                              </text>
                                          </Col>
                                      </Row>
                                  </List.Item>
                              </Card>
                          </Popover>

                        )}
                      /> : <div/>}
                  </Sider>
                  <Content style={{backgroundColor: "white", margin: " 0 10px 0 10px", padding: "10px"}}>
                          {selectedValue === undefined ? <div/> : <ChartPresentation value={selectedValue} slideList={slideList} />}

                  </Content>
                  <Sider style={{backgroundColor: "white", padding: "20px", overflowY: "scroll"}} width={"400px"}>
                      {selectedValue === undefined   ? <div/> :                       <ChartSider selectedItem={selectedItem} setSelectedValue={setSelectedValue} list={slideList} setListSlide={setListSlide} isLoading={isLoading} />
                      }

                  </Sider>
              </Layout>
              <Footer></Footer>

          </Layout>
      </>
    );
}

export default Presentation