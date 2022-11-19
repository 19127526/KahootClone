import {Col, Container, Row} from "react-bootstrap";
import {
    FacebookOutlined,
    GoogleOutlined,
    LockOutlined,
    MailOutlined,
    TwitterOutlined,
    UserOutlined
} from '@ant-design/icons';
import image from "../../assets/image/background.svg"
import {Button, Form, Input} from "antd";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
      <div className="main-container">
          <div className="login-wrapper">
              <div className="left-container">
                  <div className="header">
                  </div>
                  <div className="main">
                      <h2>Register</h2>
                      <p>Welcome! Please fill information to sign up account. you can sign in <a  style={{textDecorationLine: "underline"}}><Link to="/login">here</Link></a></p>

                      <form action="">
                          <Input type="email" name="mail" placeholder="Type your email"/>
                          <Input type="username" name="username" placeholder="Type your username"/>
                          <Input type="password" name="password" placeholder="Type your password"/>
                          <Input type="password" name="confirm_password" placeholder="Confirm your password"/>
                          <div className="forgotPass">
                          </div>
                          <div className="login-now">
                              <a>Register</a>
                          </div>
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
                          <h3 style={{color:"white"}}>Start your Kahoot clone!</h3>
                          <p>start create your amazing website with us! login into your account now</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}


export default RegisterPage