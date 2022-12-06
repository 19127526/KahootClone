import "../otp/Otp.css"
import {Select} from "antd";
import {useSelector} from "react-redux";
import {useState} from "react";
import {removeGroup} from "../../apis/group/groupApi";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints"


const otpRemoveMember = ({onSubmit, nameRoom, listEmail}) => {
  console.log(nameRoom, listEmail);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [index,setIndex]=useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dataProfile = useSelector(state => state.loginPage);

  const options=listEmail.map((value,index,arr)=>{
    if(dataProfile.profile.email!==value.email) {
      return {label: value.userName, value: value.email}
    }
    else{
      return null
    }
  }).filter(value=>value!=null)


  const clickRemoveMember = () => {
    removeGroup({nameRoom:nameRoom,gmail:index}).then((res)=>{
      console.log(res);
      if(res.status===204){
        Notification("Thông báo kick thành viên ", `Đã kích thành viên thành công!`, constraintNotification.NOTIFICATION_SUCCESS);
        onSubmit()
      }
      else{
        Notification("Thông báo kick thành viên ", `Đã kích thành viên thất bại!`, constraintNotification.NOTIFICATION_ERROR);
      }
    })
  }
  return (
    <div className="container-otp">
      <h3 style={{
        textAlign: "center",
        color: "honeydew",
        margin:"2% 0 2% 0"
      }}>Select member to kick out {nameRoom} group</h3>
      <div className="userInput">
        <Select
          showSearch
          style={{
            width: "50vh",
            textAlign:"center"
          }}
          placeholder="Select username member"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={options}
          onChange={(value)=>setIndex(value)}
        />
      </div>
      <button className="button-otp" onClick={() => clickRemoveMember()}>CONFIRM</button>
    </div>
  )
}

export default otpRemoveMember