import {Button, Input, List, Space} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {addOption, removeOption} from "../../../apis/slide/slideAPI";
import {useDispatch} from "react-redux";
import {reRenderChart} from "./ChartSider.actions";

const ChartSider = ({selectedItem, list, setListSlide}) => {
  const reRender=useDispatch();
  const onChangeQuestion = (e) => {
    list[selectedItem]["text"] = e.target.value
    let tempList = list.concat()
    setListSlide(tempList)
  }
  const handleAddButton = () => {
    addOption({option: "New option", questionId: list[selectedItem].id}).then((response) => {
      if(response.status === 201){
        if(list[selectedItem]["answers"] !== undefined){
          list[selectedItem]["answers"].push(response.data)
          const tempList = [...list]
          setListSlide(tempList)
          reRender(reRenderChart())
        }
      }
    })
    // list[selectedItem]["content"]["labels"] = [...list[selectedItem]["content"]["labels"], "New option"]
    // let datasets = list[selectedItem]["content"]["datasets"];
    // let data = [...datasets[0]["data"], 0]
    // datasets[0]["data"] = data
    // list[selectedItem]["content"]["datasets"] = datasets
    //     let tempList = list.concat()
    // setListSlide(tempList)
  }

  const handleRemoveButton = ({index, value}) => {
    // console.log(value["id"])
    // console.log(value["question"])
    // removeOption({optionID: value["id"],questionID: value["question"]}).then((response) => {
    //     console.log(response)
    // })
    // let lable = list[selectedItem]["content"]["labels"]
    // let data = list[selectedItem]["content"]["datasets"][0]["data"]
    // list[selectedItem]["content"]["labels"] = lable.filter((_, i) => i !== index)
    // list[selectedItem]["content"]["datasets"][0]["data"] = data.filter((_, i) => i !== index)
    // let tempList = list.concat()
    // setListSlide(tempList)
  }

  const onChangeOption = (index) => (e) => {
    let lable = [...list[selectedItem]["content"]["labels"]]
    lable[index] = e.target.value
    list[selectedItem]["content"]["labels"] = lable
    let tempList = list.concat()
    setListSlide(tempList)
  }


  return (
    <Space direction={"vertical"} size={"small"}>

      <text>
        Question
      </text>
      <Input size={"large"} allowClear placeholder={"Type your question"} maxLength={150}
             showCount
             value = {list[selectedItem].text}
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