import {Modal, Spin} from "antd";
import OtpComponent from "../../components/otp/OtpComponent";
import {useNavigate} from "react-router-dom";
import {LOGIN_URI} from "../../configs/url";

import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import {postRegisterApi} from "../../apis/register/registerApi";
import {useState} from "react";

const SignUpPage=()=>{
  const navigate=useNavigate()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cofirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleEmail = event => {
    setEmail(event.target.value)
  }
  const handlePassword = event => {
    setPassword(event.target.value)
  }
  const handleConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }
  const handleUsername = event => {
    setUserName(event.target.value);
  }
  const submitRegister = (event) => {
    event.preventDefault();
    if (userName === "" || password === "" || cofirmPassword === "" || email === "") {
      Notification("Thông báo đăng ký", "Vui lòng điền đầy đủ thông tin", constraintNotification.NOTIFICATION_WARN)
    } else if (cofirmPassword !== password) {
      Notification("Thông báo đăng ký", "Mật khẩu không trùng khớp", constraintNotification.NOTIFICATION_WARN)
    }
    else if(password.length<8){
      Notification("Thông báo đăng ký", "Vui lòng điền mật khẩu hơn 8 kí tự", constraintNotification.NOTIFICATION_WARN)
    }
    else if(cofirmPassword.length<8){
      Notification("Thông báo đăng ký", "Vui lòng điền mật khẩu hơn 8 kí tự", constraintNotification.NOTIFICATION_WARN)
    }
    else{
      setIsLoading(true)
      postRegisterApi({userName: userName, password: password, email: email})
        .then(res => {
          if(res.status===202){
            Notification("Thông báo đăng ký", "Vui lòng điền OTP", constraintNotification.NOTIFICATION_SUCCESS)
            showModal();
          }
          else if(res.response.status==400){
            Notification("Thông báo đăng ký", res.response.data.message, constraintNotification.NOTIFICATION_WARN)
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }
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
              <p className="text-center">SIGNUP TO GET INSTANT ACCESS</p>
              <form id="login-form" action="https://modularcode.io/index.html" method="GET" noValidate="">
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input type="email" className="form-control underlined" name="username" id="username"
                         placeholder="Your email address" required onChange={handleEmail}/></div>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input type="text" className="form-control underlined" name="username" id="username"
                         placeholder="Your user name" required onChange={handleUsername} /></div>
                <div className="form-group has-error">
                  <label htmlFor="password">Password</label>
                  <div className="row">
                    <div className="col-sm-6">
                      <input type="password" className="form-control underlined" name="password" id="password"
                             placeholder="Enter password" required="" aria-describedby="pass-error" aria-invalid="true" onChange={handlePassword}/>
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control underlined" name="retype_password"
                             id="retype_password" placeholder="Re-type password" required=""
                             aria-describedby="pass-error" aria-invalid="true" onChange={handleConfirmPassword}/></div>
                  </div>
                  {password.length < 8 && cofirmPassword.length < 8 ?
                    <span id="pass-error" className="has-error">Passwords should be at least 8 characters.</span>
                    :
                    ""
                  }
                </div>
                <div className="form-group"  >
                  <button type="submit" className="btn btn-block btn-primary"  onClick={submitRegister} disabled={isLoading===true?true:false}>Sign Up</button>
                  <Modal  title="OTP"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  centered style={{background:"red"}}>
                    <OtpComponent onSubmit={()=>setIsModalOpen(false)} type="register" email={email}/>
                  </Modal>
                </div>
                <div className="form-group">
                  <p className="text-muted text-center">Already have an account?
                    <a onClick={()=>navigate(LOGIN_URI)} disabled={isLoading===true?true:false}>Login!</a>
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

export default SignUpPage