import {Button, Col, Input, List, Row, Space} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {addOption, changeOption, changeQuestion, getDetailSlide, removeOption} from "../../../apis/slide/slideAPI";
import {useDispatch} from "react-redux";
import {reRenderChart} from "./ChartSider.actions";
import {useEffect, useState} from "react";

const ChartSider = ({selectedItem, list, setListSlide, setSelectedValue}) => {
    const [detail, setDetail] = useState(undefined);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
      async function getDetail() {
          setLoading(true)
          let response = await getDetailSlide({id: list[selectedItem].id})
          // console.log(response.data)
          setDetail(response.data)
          setSelectedValue(response.data)
          setLoading(false)

      }
        getDetail()
    }, [selectedItem])

  const reRender=useDispatch();
  const onChangeQuestion = (e) => {
    list[selectedItem]["text"] = e.target.value
    let tempList = list.concat()
    setListSlide(tempList)
  }

  const onBlurQuestion  = (e) =>{
      console.log(e.target.value)
      console.log( list[selectedItem].id)
      changeQuestion({id: list[selectedItem].id, text: e.target.value}).then(() => {
      })
  }

  const handleAddButton = () => {
    addOption({option: `New option ${detail["votes"]=== null ? 1 : detail["votes"].length}`, slideId: detail.id}).then((response) => {
      if(response.status === 201){
        if(detail["votes"]!== undefined){
            setSelectedValue(response.data)
          // list[selectedItem] = response.data
          // const tempList = [...list]
          // setListSlide(tempList)
          // reRender(reRenderChart())
        }
      }
        // console.log(response)
    })
  }

  const handleRemoveButton = ({index, value}) => {
    removeOption({optionID: value.id,questionID:  list[selectedItem].id}).then((response) => {
        console.log(response)
    })
      list[selectedItem]["answers"] = list[selectedItem]["answers"].filter((v) => value.id !== v.id)
    let tempList = list.concat()
    setListSlide(tempList)
  }

  const onChangeOption = (index) => (e) => {
      list[selectedItem].answers[index].text = e.target.value
    let tempList = list.concat()
    setListSlide(tempList)
  }

  const handleBlur = (index) => (e) => {
      changeOption({id:list[selectedItem].answers[index].id, text: e.target.value}).then(()=>{

      })
  }


  return (
    <Space direction={"vertical"} size={"small"}>

      <text>
        Question
      </text>
      <Input
          size={"large"} allowClear placeholder={"Type your question"} maxLength={150}
             showCount
             value = {list[selectedItem].text}
          onBlur ={onBlurQuestion}
          onChange={onChangeQuestion}/>

      <div style={{height: "10px"}}/>

      <text>
        Options
      </text>

      {
          isLoading ? <div/> : detail["votes"].map((value, index) => {
              return (
                  <Space direction={"horizontal"} wrap={false} style={{width:"100%"}}>
                      <Col flex={10}>
                          <Input size={"large"} value={value.text}
                                 onBlur={handleBlur(index)}
                                 onChange={onChangeOption(index)}/>
                      </Col>
                      <Col flex={2}>
                          <Button icon={<CloseOutlined/>}
                                  onClick={() => handleRemoveButton({index, value})}/>
                      </Col>
                  </Space>
              )
          })
      }

      <Button icon={<PlusOutlined/>} onClick={handleAddButton}> Add option</Button>
    </Space>
  );
}

export default ChartSider