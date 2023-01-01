import { GoogleOutlined} from "@ant-design/icons";
import {useEffect, useLayoutEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {loginNormal} from "./LoginPage.thunk";
import * as constraints from "./LoginPage.constraints"
import {Link, useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import {Modal} from "antd";
import OtpComponent from "../../components/otp/OtpComponent";
import "./LoginPage.css"
import {
  CLIENT_LOGIN_GOOGLE,
  CLIENT_URL_REDIRECT, FORGOT_PASSWORD_URI,
  GET_LOGIN_OAUTH2,
  REGISTER_URI,
} from "../../configs/url";
import {removeUrlGuard} from "../../guards/AuthenticateRoutes.actions";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {postLoginGoogle} from "../../apis/login/loginApi";
import {turnOffLoading, turnOnLoading} from "../../layouts/MainLayout.actions";
import * as actions from "./LoginPages.actions";
import {typeLogin} from "../../utils/utils";

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  loginNormal:loginNormal,
}

const connector = connect(mapStateToProps,mapDispatchToProps)


let stompClient=null
const LoginPage = (props) => {
  const {loginNormal}=props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typeOtp,setTypeOtp]=useState("");
  const [profileSocial,setProfileSocial]=useState(null);
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataUrl=useSelector((state)=>state.authenticateRoutes);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch=useDispatch();

  const handleCallbackResponse=(response)=>{
    const decoded = jwt_decode(response.credential);
    setProfileSocial(decoded);
    setTypeOtp(typeLogin.LOGIN_OAUTH2)
  /*  loginGoogle({accessToken:response.credential,decoded:decoded})*/
    if(response.credential){
      dispatch(turnOnLoading());
      return  postLoginGoogle({email:decoded.email,userName:decoded.name,imageURL:decoded.picture})
        .then(async (res) => {
          if (res.status == 200) {
            /*registerUser();*/
            showModal();
          } else if (res.response.status == 400) {
            Notification("Thông báo đăng nhập", "Lỗi đăng nhập",constraintNotification.NOTIFICATION_ERROR)
          }
        })
        .catch((err) => {
          Notification("Thông báo đăng nhập", err.toString(),constraintNotification.NOTIFICATION_ERROR)
        })
        .finally(()=>{
          dispatch(turnOffLoading());
        })
    }
    else{
      Notification("Thông báo đăng nhập", "Lỗi đăng nhập",constraintNotification.NOTIFICATION_ERROR)
    }
    /* navigate("/home");
    // Notification("Thông báo đăng nhập", "Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)*/
  }
  useLayoutEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"688222432576-k1s9h0gtvv9gpr18fma1gpi1t64vfb7o.apps.googleusercontent.com",
      callback:handleCallbackResponse,
    });
    /* global google */
    google.accounts.id.renderButton(
      document.getElementById("signInGoogle"),
      { theme: 'outline',
        size: 'medium'}
    )
  },[]);
 /* const loginByGoogle=()=>{
    console.log("haha")
    request.get('/login/oauth2/code/google')
      .then(response=>{response.data.includes("Login with OAuth 2.0")?("http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/login/google/redirect"):console.log("huhu")})
      .catch(error=>{console.log(error)})
  }*/

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const submitLogin= async (event)=>{
    event.preventDefault();
    if(username===""||password===""){
      Notification("Thông báo đăng nhập", "Vui lòng điền đầy đủ tài khoản và mật khẩu",constraintNotification.NOTIFICATION_WARN)
      return;
    }
    const temp= await loginNormal({username:username,password:password});
    if(temp.type===constraints.LOGIN_NORMAL_SUCCESS){
      Notification("Thông báo đăng nhập", "Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)
      navigate(dataUrl.url);
        dispatch(removeUrlGuard());
    }
    else{
      Notification("Thông báo đăng nhập", "Đăng nhập thất bại (Tài khoản và mật khẩu không đúng)",constraintNotification.NOTIFICATION_ERROR)
    }
  }
  const redirect_url=`http://localhost:8080/oauth2/authorization/google?redirect_uri=${CLIENT_URL_REDIRECT}`

  return (
    <>
      <div className="auth">
        <div className="auth-container">
          <div className="card" style={{height:"100%"}}>
            <header className="auth-header">
              <h1 className="auth-title">
                <div className="logo">
                  <span className="l l1"></span>
                  <span className="l l2"></span>
                  <span className="l l3"></span>
                  <span className="l l4"></span>
                  <span className="l l5"></span>
                </div>
                SliderClone
              </h1>
            </header>
            <div className="auth-content">
              <p className="text-center">LOGIN TO CONTINUE</p>
              <form >
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input type="email" className="form-control underlined" name="username" id="username"
                         placeholder="Your email address" required onChange={handleUsername}/></div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control underlined" name="password" id="password"
                         placeholder="Your password" required onChange={handlePassword}/></div>
                <div className="form-group">
                  <label htmlFor="remember">
                    <input className="checkbox" id="remember" type="checkbox"/>
                    <span>Remember me</span>
                  </label>
                  <a onClick={()=>navigate(FORGOT_PASSWORD_URI)} className="forgot-btn pull-right">Forgot password?</a>
                </div>
                <div className="form-group"  onClick={submitLogin}>
                  <button type="submit" className="btn btn-block btn-primary">Login</button>
                  <Modal  title="OTP"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  centered style={{background:"red"}}>
                    <OtpComponent onSubmit={()=>setIsModalOpen(false)} type={typeOtp} email={profileSocial?.email} />
                  </Modal>
                </div>
                <div className="form-group">
                  <p className="text-muted text-center">Do not have an account?
                    <a onClick={()=>navigate(REGISTER_URI)}> Sign Up !</a>
                  </p>
                </div>
                <div className="form-group" id={"signInGoogle"} style={{justifyContent:"center",display:"flex"}}>
                  <p className="text-muted text-center">You can also login with
                    <a ><GoogleOutlined className="logo-google" /></a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="ref" id="ref">
        <div className="color-primary"></div>
        <div className="chart">
          <div className="color-primary"></div>
          <div className="color-secondary"></div>
        </div>
      </div>

    </>
  )
}


export default connector(LoginPage)