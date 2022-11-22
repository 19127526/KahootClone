import {FacebookOutlined, GoogleOutlined, TwitterOutlined} from "@ant-design/icons";
import {useState} from "react";
import {connect, useDispatch} from "react-redux";
import {getUserNameAndPassword} from "./LoginPage.thunk";
import * as constraints from "./LoginPage.constraints"
import {Link, useNavigate} from "react-router-dom";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import Notification from "../../components/notification/Notification";
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
  getUserNameAndPassword:getUserNameAndPassword
}

const connector = connect(mapStateToProps,mapDispatchToProps)


const LoginPage = (props) => {
  const {getUserNameAndPassword}=props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const submitLogin=(event)=>{
    event.preventDefault();
    if(username===""||password===""){
      Notification("Thông báo đăng nhập", "Vui lòng điền đầy đủ tài khoản và mật khẩu",constraintNotification.NOTIFICATION_WARN)
      return;
    }
    const temp=getUserNameAndPassword({username:username,password:password});
    if(temp.type===constraints.LOGIN_SUCCESS){
      navigate("/home");
      Notification("Thông báo đăng nhập", "Đăng nhập thành công",constraintNotification.NOTIFICATION_SUCCESS)
    }
    else{
      Notification("Thông báo đăng nhập", "Đăng nhập thất bại",constraintNotification.NOTIFICATION_ERROR)
    }
  }

  return (
    <div className="main-container">
      <div className="login-wrapper">
        <div className="left-container">
          <div className="header">
          </div>
          <div className="main">
            <h2>Login</h2>
            <p>Welcome! Please fill username and password to sign in into your account.</p>
            <form onSubmit={submitLogin}>
              <input type="email" name="mail" placeholder="Type your email" onChange={handleUsername}/>
              <input type="password" name="password" placeholder="Type your password" onChange={handlePassword}/>
              <div className="forgotPass" style={{display: "flex", justifyContent: "space-between"}}>
                <a><Link to="/register">Sign up</Link></a>
                <a>Forgot your password?</a>
              </div>
              <div className="login-now">
                <a type="submit" onClick={submitLogin}>Login Now</a>
              </div>
              <span className="line"></span>
            </form>
          </div>
          <div className="footer">
            <div className="social-media">
              <h3>You can also login with</h3>
              <div className="links-wrapper">
                <a href="#"><GoogleOutlined/></a>
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