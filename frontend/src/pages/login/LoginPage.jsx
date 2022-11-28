import {FacebookOutlined, GoogleOutlined, TwitterOutlined} from "@ant-design/icons";
import {useEffect, useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {loginGoogle, loginNormal} from "./LoginPage.thunk";
import * as constraints from "./LoginPage.constraints"
import {Link, useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import {Modal} from "antd";
import OtpComponent from "../../components/otp/OtpComponent";
import request from "../../apis/request";
import {CLIENT_URL_REDIRECT} from "../../configs/url";

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  loginNormal:loginNormal,
  loginGoogle:loginGoogle
}

const connector = connect(mapStateToProps,mapDispatchToProps)


const LoginPage = (props) => {
  const {loginNormal,loginGoogle}=props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userGoogle,setUserGoogle]=useState();
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCallbackResponse=(response)=>{
    const decoded = jwt_decode(response.credential);
    setUserGoogle(decoded);
    console.log(decoded);
    loginGoogle({accessToken:response.credential,decoded:decoded})
    if(response.credential){
      showModal();
    }
    /* navigate("/home");
    Notification("Thông báo đăng nhập", "Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)*/
  }
  useLayoutEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"596589929405-vph8vt5071m8lum3t0mcio71iubciu7e.apps.googleusercontent.com",
      callback:handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInGoogle"),
      {}
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
  const submitLogin=(event)=>{
    event.preventDefault();
    const temp=loginNormal({username:username,password:password});
    showModal();
    /*if(username===""||password===""){
      Notification("Thông báo đăng nhập", "Vui lòng điền đầy đủ tài khoản và mật khẩu",constraintNotification.NOTIFICATION_WARN)
      return;
    }
    const temp=loginNormal({username:username,password:password});
    if(temp.type===constraints.LOGIN_NORMAL_SUCCESS){
      navigate("/home");
      Notification("Thông báo đăng nhập", "Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)
    }
    else{
      Notification("Thông báo đăng nhập", "Đăng nhập thất bại",constraintNotification.NOTIFICATION_ERROR)
    }*/
  }
  const redirect_url=`http://localhost:8080/oauth2/authorization/google?redirect_uri=${CLIENT_URL_REDIRECT}&client_id=596589929405-vph8vt5071m8lum3t0mcio71iubciu7e.apps.googleusercontent.com`

  return (
    <div className="main-container">
      <div className="login-wrapper">
        <div className="left-container">
          <div className="header">
          </div>
          <div className="main">
            <h2>Login</h2>
            <p>Welcome! Please fill username and password to sign in into your account.</p>
            <form onSubmit={submitLogin} >
              <input type="email" name="mail" placeholder="Type your email" onChange={handleUsername}/>
              <input type="password" name="password" placeholder="Type your password" onChange={handlePassword}/>
              <div className="forgotPass" style={{display: "flex", justifyContent: "space-between"}}>
                <a><Link to="/register">Sign up</Link></a>
                <a>Forgot your password?</a>
              </div>
              <div className="login-now">
                <a type="submit" onClick={submitLogin}>Login Now</a>
                <Modal  title="OTP"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  centered style={{background:"red"}}>
                  <OtpComponent onSubmit={()=>setIsModalOpen(false)}/>
                </Modal>
              </div>
              <span className="line"></span>
            </form>
          </div>
          <div className="footer">
            <div className="social-media">
              <h3>You can also login with</h3>
              <div className="links-wrapper">
                <a href={redirect_url}><GoogleOutlined/></a>
                <a href="#"><FacebookOutlined/></a>
                <a href="#"><TwitterOutlined/></a>
              </div>
            </div>
          </div>
        </div>
        <div className="side-container">
          <div className="side-text-container">
            <div className="short-line">
              <hr/>
            </div>
            <div className="text">
              <h3 style={{color: "white"}}>Start your Kahoot clone!</h3>
              <p>start create your amazing website with us! login into your account now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connector(LoginPage)