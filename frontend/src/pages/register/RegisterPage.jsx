import {Input, Modal, Spin} from "antd";
import {Link} from "react-router-dom";
import {useState} from "react";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"
import {postRegisterApi} from "../../apis/register/registerApi";
import OtpComponent from "../../components/otp/OtpComponent";

const RegisterPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [cofirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false)
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
        } else {
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
      <Spin spinning={isLoading}>
          <div className="main-container">
              <div className="login-wrapper">
                  <div className="left-container">
                      <div className="header">
                      </div>
                      <div className="main">
                          <h2>Register</h2>
                          <p>Welcome! Please fill information to sign up account. you can sign in <a
                            style={{textDecorationLine: "underline"}}><Link to="/login">here</Link></a></p>
                          <form action="">
                              <Input type="email" name="mail" placeholder="Type your email" onChange={handleEmail}/>
                              <Input type="username" name="username" placeholder="Type your username"
                                     onChange={handleUsername}/>
                              <Input type="password" name="password" placeholder="Type your password"
                                     onChange={handlePassword}/>
                              <Input type="password" name="confirm_password" placeholder="Confirm your password"
                                     onChange={handleConfirmPassword}/>
                              <div className="forgotPass">
                              </div>
                              <div className="login-now" onClick={submitRegister}>
                                  <a>Register</a>
                              </div>
                              <Modal  title="OTP"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  centered style={{background:"red"}}>
                                  <OtpComponent onSubmit={()=>setIsModalOpen(false)} type="register" email={email}/>
                              </Modal>
                              <span className="line"> </span>
                          </form>
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
      </Spin>
    )
}


export default RegisterPage