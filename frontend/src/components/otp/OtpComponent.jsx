import "./Otp.css"
import {useState} from "react";
import * as otp from "./OtpComponent.constraints"
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import {postOtp} from "./OtpComponent.thunk";
import {connect, useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {removeUrlGuard} from "../../guards/AuthenticateRoutes.actions";
import {postValidateOtp} from "../../apis/register/registerApi";
import {typeLogin} from "../../utils/utils";
import {loginGoogleSuccess} from "../../pages/login/LoginPages.actions";


const mapStateToProps = state => ({})
const mapDispatchToProps = {
  postOtp: postOtp,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const OtpComponent = (props) => {
  const {postOtp, onSubmit, type, email,payloadSocial} = props;
  const [otpValue, setOtpValue] = useState([null, null, null, null, null, null]);
  const data = useSelector(state => state.loginPage);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let dataUrl = useSelector(state => state.authenticateRoutes);
  const handleUsername = (event) => {
    const e = otpValue.map((item, position) => {
      console.log(position, event.target.id);
      return ((position == event.target.id) ? event.target.value : item)
    });
    setOtpValue(e)
  }

  const clickButtonOtp = () => {
    if (otpValue.includes(null) || otpValue.includes('')) {
      Notification("Thông báo otp", "Vui lòng điền đẩy đủ mã otp", constraintNotification.NOTIFICATION_WARN)
    } else {
      let otp = "";
      otpValue.forEach(index => {
        otp += index
      });
      if (type==typeLogin.LOGIN_OAUTH2) {
        postValidateOtp({otp: otp, email: email})
          .then((res) => {
            if (res.status === 201) {
              onSubmit();
              const objectProfile={
                id:null,
                userName:payloadSocial?.name,
                email:payloadSocial?.email,
                imageURL:payloadSocial?.picture,
              }
              localStorage.setItem("accessToken", payloadSocial?.jti);
              dispatch(loginGoogleSuccess(objectProfile))
              if(dataUrl.url.includes("/login")) {
                navigate("/");
              }
              else{
                navigate(dataUrl.url);
              }
              dispatch(removeUrlGuard());
              Notification("Thông báo đăng nhập", "Đăng nhập thành công", constraintNotification.NOTIFICATION_SUCCESS)
            } else if (res.response.status == 400) {
              Notification("Thông báo đăng nhập","Đăng nhập thất bại", constraintNotification.NOTIFICATION_ERROR)
            }
          })
          .catch(err =>{
            Notification("Thông báo đăng nhập", err.toString(), constraintNotification.NOTIFICATION_ERROR)
          })
          .finally(() => {
          });

      } else if(type==typeLogin.LOGIN_TRADITIONAL) {
        postValidateOtp({otp: otp, email: email})
          .then((res) => {
            if (res.status === 201) {
              onSubmit();
              navigate("/login")
              Notification("Thông báo đăng ký", "Đăng ký thành công, hãy đăng nhập", constraintNotification.NOTIFICATION_SUCCESS)
            } else if (res.response.status == 400) {
              Notification("Thông báo đăng ký", res.response.data.message, constraintNotification.NOTIFICATION_ERROR)
            }
          })
          .catch(err => console.log(err))
          .finally(() => {
          });
      /*  postOtp(otpValue)
        if (data.isLogin === true) {
          console.log(dataUrl.url)
          navigate(dataUrl.url);
          dispatch(removeUrlGuard());
          Notification("Thông báo đăng nhập", "Đăng nhập thành công", constraintNotification.NOTIFICATION_SUCCESS)
        }*/
      }/*

      Notification("Thông báo otp","Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)*/
    }
  }

  return (
    <div className="container-otp">
      <h1>ENTER OTP</h1>
      <div className="userInput">
        <input onInput="this.value = this.value.toUpperCase()" type="text" id={otp.one} className='input-otp'
               autoComplete="false" onChange={handleUsername}
               maxLength="1" onKeyUp="clickEvent(this,'sec')"/>
        <input onInput="this.value = this.value.toUpperCase()" type="text" id={otp.two} className='input-otp'
               autoComplete="false" onChange={handleUsername}
               maxLength="1" onKeyUp="clickEvent(this,'third')"/>
        <input onInput="this.value = this.value.toUpperCase()" type="text" id={otp.three} className='input-otp'
               autoComplete="false" onChange={handleUsername}
               maxLength="1" onKeyUp="clickEvent(this,'fourth')"/>
        <input onInput="this.value = this.value.toUpperCase()" type="text" id={otp.four} className='input-otp'
               autoComplete="false" onChange={handleUsername}
               maxLength="1" onKeyUp="clickEvent(this,'fifth')"/>
        <input onInput="this.value = this.value.toUpperCase()" type="text" id={otp.five} className='input-otp'
               autoComplete="false" onChange={handleUsername}
               maxLength="1" onKeyUp="clickEvent(this,'six')"/>
        <input onInput="this.value = this.value.toUpperCase()" type="text" id={otp.six} className='input-otp'
               autoComplete="false" onChange={handleUsername}
               maxLength="1"/>
      </div>
      <button className="button-otp" onClick={() => clickButtonOtp()}>CONFIRM</button>
    </div>
  )
}

export default connector(OtpComponent)