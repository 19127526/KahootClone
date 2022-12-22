import {List, Popover} from "antd"
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Divider, Dropdown, Layout, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";
import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import ChartSider from "../../components/chart/Sider/ChartSider";
import {getPresentationDetail} from "../../apis/presentation/presentationAPI";
import {useNavigate, useParams} from "react-router-dom";
import {addNewSlide, deleteSlide} from "../../apis/slide/slideAPI";
import {PRESENTATION_URI} from "../../configs/url";
import {useSelector} from "react-redux";


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

    const {id}=useParams();
    const navigate=useNavigate()
    const dataProfile = useSelector(state => state.loginPage);
    const email = dataProfile.profile.email;
    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedValue, setSelectedValue] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [hoverItem, setHoverItem] = useState(0)
    const [slideList, setListSlide] = useState([]);
    // const [isConnected,setIsConnected]=useState(false)
    // const [userData,setUserData]=useState({
    //     userName:"",
    //     receiverName:"",
    //     connected:false,
    //     message:""
    // });
    const handleClickItem = (index) => {
        setSelectedValue(slideList[index])
        setSelectedItem(index)
    }
    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                addSlide({genre: "MULTI_CHOICES"})
                break;
            case "1":

                break;
            default:
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
        if(selectedItem === hoverItem || selectedItem > hoverItem) {
            setSelectedValue(slideList[selectedItem-1])
            setSelectedItem(selectedItem-1)
        }
        // if(hoverItem === 1 && list.length == 2){
        //     setSelectedItem(selectedItem > hoverItem ? 0 : 0)
        // }
        // else {
        //     setSelectedItem(hoverItem <= selectedItem ? selectedItem-1 : selectedItem)
        // }
        // setSelectedValue(list[selectedItem])

    }

    const addSlide = ({genre}) => {
        addNewSlide({id: id, question:"Your question", genre: genre}).then((response) => {
            setIsLoading(true)
            if(response.status === 201){
                if(slideList.length === 0 ){
                    setListSlide([response.data])
                }
                else{
                    setListSlide([...slideList,response.data])
                }
                setSelectedValue(response.data)
                setSelectedItem(slideList.length)
                setIsLoading(false)
            }

        })
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
        async function getDetail() {
            setIsLoading(true)
            let response = await getPresentationDetail({id: id, email:email })
            if(response.status === 200){
                if(response.data.slides.length === 0){
                    await addSlide({genre:"MULTI_CHOICES"})
                } else {
                    console.log(response.data.slides)
                    setSelectedValue(response.data.slides[0])
                    setListSlide(response.data.slides)
                }
            }
            setIsLoading(false)

        }
        getDetail()

    },[])

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
                          {isLoading || selectedValue === undefined ? <div/> : <ChartPresentation selectedValue={selectedValue}/>}

                  </Content>
                  <Sider style={{backgroundColor: "white", padding: "20px", overflowY: "scroll"}} width={"400px"}>
                      {isLoading || selectedValue === undefined ? <div/> : <ChartSider selectedValue={selectedValue}  setSelectedValue={setSelectedValue} selectedItem={selectedItem} />
                      }

                  </Sider>
              </Layout>
              <Footer></Footer>

          </Layout>
      </>
    );
}

export default Presentation