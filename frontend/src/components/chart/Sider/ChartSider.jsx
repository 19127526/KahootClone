import {Button, Input, List, Space} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {addOption, changeOption, changeQuestion, removeOption} from "../../../apis/slide/slideAPI";
import {useDispatch} from "react-redux";
import {reRenderChart} from "./ChartSider.actions";

const ChartSider = ({selectedItem, list, setListSlide}) => {
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
    addOption({option: `New option ${list[selectedItem]["answers"] === undefined ? 1 : list[selectedItem]["answers"].length}`, questionId: list[selectedItem].id}).then((response) => {
      if(response.status === 201){
        if(list[selectedItem]["answers"] !== undefined){
          list[selectedItem]["answers"].push(response.data)
          const tempList = [...list]
          setListSlide(tempList)
          reRender(reRenderChart())
        }
      }
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
        list[selectedItem]["answers"] !== undefined ?
          list[selectedItem]["answers"].map((value, index) => {
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  title={<Input size={"large"} value={value.text}
                                onBlur={handleBlur(index)}
                                onChange={onChangeOption(index)}/>}
                  style={{marginRight: "5px"}}
                />
                <Button icon={<CloseOutlined/>}
                        onClick={() => handleRemoveButton({index, value})}/>
              </List.Item>
            )
          }) : <div/>
      }

      <Button icon={<PlusOutlined/>} onClick={handleAddButton}> Add option</Button>
    </Space>
  );
}

export default ChartSider