import {Button, Col, Input, Space} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {addOption, changeOption, changeQuestion, getDetailSlide, removeOption} from "../../../apis/slide/slideAPI";
import {useEffect, useState} from "react";
import LoadingExample from "../../loading/LoadingExample";

const ChartSider = ({selectedValue,selectedItem, setSelectedValue}) => {
    const [detail, setDetail] = useState(undefined);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
      async function getDetail() {
          setLoading(true)
          let response = await getDetailSlide({id: selectedValue.id})
          setDetail(response.data)
          setSelectedValue(response.data)
          setLoading(false)
      }
        getDetail()
    }, [selectedItem])

  const onChangeQuestion = (e) => {
      setSelectedValue(prevState => ({
          ...prevState,
          text: e.target.value
      }));
  }

  const onBlurQuestion  = (e) =>{
      changeQuestion({id: selectedValue.id, text: e.target.value}).then(() => {
      })
  }

  const handleAddButton = () => {
      addOption({option: `New option ${detail["votes"]=== null ? 1 : detail["votes"].length}`, slideId: detail.id}).then((response) => {
          console.log("before",selectedValue)
          if(response.status === 201){
        if(detail["votes"]!== undefined){
            detail.votes = [...detail.votes,response.data]
            setSelectedValue(prevState => ({
                ...prevState,
                votes: detail.votes
            }));
            setDetail(
                detail
            )
        }
      }
          console.log("after",selectedValue)

      })
  }

  const handleRemoveButton = ({value}) => {
    removeOption({optionID: value.id}).then(r => {});
      detail.votes = detail.votes.filter((v) => value.id !== v.id)
      setSelectedValue(prevState => ({
          ...prevState,
          votes: detail.votes
      }));  }

  const onChangeOption = (index) => (e) => {
      selectedValue.votes[index].text = e.target.value
      setSelectedValue(prevState => ({
          ...prevState,
          votes: selectedValue.votes
      }))
  }

  const handleBlur = (index) => (e) => {
      changeOption({id:selectedValue.votes[index].id, text: e.target.value}).then(()=>{

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
             value = {selectedValue.text}
          onBlur ={onBlurQuestion}
          onChange={onChangeQuestion}/>

      <div style={{height: "10px"}}/>

      <text>
        Options
      </text>

      {
          isLoading ? <LoadingExample/> : detail["votes"].map((value, index) => {
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