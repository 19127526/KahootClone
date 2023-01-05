import {Input, Space} from "antd";
import React, {useEffect, useState} from "react";
import {changeQuestion, updateHeader} from "../../apis/slide/slideAPI";
import ParagraphComponent from "../paragraph/ParagraphComponent";
import JoditEditor from "jodit-react";
import useDebounce from "../../hooks/useDebounce";
import {useDispatch} from "react-redux";

const SlideSider = ({selectedItem,selectedValue, setSelectedValue,setListSlide,slideList, email, presentationId}) => {
    const debounceValue = useDebounce(selectedValue, 300);

    const onBlurHeader = (e) => {
       /* updateHeader({id: selectedValue.id, heading:e.target.value, text: selectedValue.text}).then(() => {
        })*/
    }

    const onBlurParagraph = (e) => {
     /*   updateHeader({id: selectedValue.id, text: e, heading:selectedValue.heading}).then(() => {
        })*/
    }


    const onChangeHeader = (e) => {
        setSelectedValue(prevState => ({
            ...prevState,
            heading: e.target.value
        }));
    }


    const onChangeParagraph = (e) => {
        setSelectedValue(prevState => ({
            ...prevState,
            text: e
        }));
    }

    useEffect(() => {
        setSelectedValue(selectedValue);
    }, [onBlurParagraph, onChangeParagraph]);

    useEffect(() => {
          if (debounceValue) {

            console.log("Saving");
              updateHeader({id: selectedValue.id, text: selectedValue?.text, heading:selectedValue.heading, email: email, presentation: presentationId}).then((res) => {
                const temp=slideList.map((value,index)=>{
                  if(index==selectedItem){
                    return res.data;
                  }
                  else{
                    return value;
                  }
                })
                setListSlide(temp)
              })
          }
          else {
          }
      },[debounceValue]);


    
    return (
        <Space direction={"vertical"} style={{width: "100%"}}>
            <b>
                Heading
            </b>
            <Input size={"large"}
                   value = {selectedValue.heading}
                   onBlur={onBlurHeader}
                   allowClear placeholder={"Type your header"} maxLength={150}
                   showCount onChange={onChangeHeader}/>
            <b>
                Paragraph
            </b>
            <JoditEditor  onChange={onChangeParagraph}
                         value={selectedValue.text} onBlur={onBlurParagraph}
            />

        </Space>
    );
}
export default SlideSider