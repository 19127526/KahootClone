import "./Otp.css"
import {useEffect, useState} from "react";
import * as otp from "./OtpComponent.constraints"
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import {loginGoogle, loginNormal} from "../../pages/login/LoginPage.thunk";
import {postOtp} from "./OtpComponent.thunk";
import {connect, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  postOtp:postOtp
}

const connector = connect(mapStateToProps,mapDispatchToProps)

const OtpComponent = (props) => {
  const{postOtp,onSubmit}=props;
  const [otpValue,setOtpValue]=useState([null,null,null,null,null,null]);
  const data=useSelector(state=>state.loginPage);
  const navigate=useNavigate();
  const handleUsername = (event) => {
    const e = otpValue.map((item,position)=> { console.log(position,event.target.id); return ((position == event.target.id) ? event.target.value : item) });
    setOtpValue(e)
  }

  const clickButtonOtp=()=>{
    if(otpValue.includes(null)||otpValue.includes('')){
      Notification("Thông báo otp","Vui lòng điền đẩy đủ mã otp",constraintNotification.NOTIFICATION_WARN)
    }
    else{
      postOtp(otpValue)
      if(data.isLogin===true){
        navigate("/profile")
      }
      Notification("Thông báo otp","Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)
    }
  }

  return (
    <div className="container-otp">
      <h1>ENTER OTP</h1>
      <div className="userInput">
        <input type="text" id={otp.one} className='input-otp' autoComplete="false" onChange={handleUsername}  maxLength="1" onKeyUp="clickEvent(this,'sec')"/>
        <input type="text" id={otp.two}  className='input-otp' autoComplete="false" onChange={handleUsername} maxLength="1" onKeyUp="clickEvent(this,'third')"/>
        <input type="text" id={otp.three} className='input-otp' autoComplete="false" onChange={handleUsername} maxLength="1" onKeyUp="clickEvent(this,'fourth')"/>
        <input type="text" id={otp.four} className='input-otp' autoComplete="false" onChange={handleUsername} maxLength="1" onKeyUp="clickEvent(this,'fifth')"/>
        <input type="text" id={otp.five} className='input-otp' autoComplete="false" onChange={handleUsername} maxLength="1" onKeyUp="clickEvent(this,'six')"/>
        <input type="text" id={otp.six} className='input-otp' autoComplete="false" onChange={handleUsername} maxLength="1"/>
      </div>
      <button className="button-otp" onClick={()=>clickButtonOtp()}>CONFIRM</button>
    </div>
  )
}

export default connector(OtpComponent)