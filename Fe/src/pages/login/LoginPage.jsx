import image from "../../assets/image/Login.png"
import {Button, Checkbox, Form, Input} from "antd";
import {FacebookOutlined, GoogleOutlined, TwitterOutlined} from "@ant-design/icons";

const LoginPage = () => {
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
            <h2>Login</h2>
            <p>Welcome! Please fill username and password to sign in into your account.</p>

            <form action="">
              <input type="email" name="mail" placeholder="Type your email"/>
                <input type="password" name="password" placeholder="Type your password"/>
                  <div className="forgotPass" style={{display:"flex",justifyContent:"space-between"}}>
                    <a href="/register">Sign up</a>
                    <a href="#">Forgot your password?</a>
                  </div>
                  <div className="login-now">
                    <a href="#">Login Now</a>
                  </div>
                  <span className="line"></span>
            </form>
          </div>
          <div className="footer">
            <div className="social-media">
              <h3>You can also login with</h3>
              <div className="links-wrapper">
                <a href="#"><GoogleOutlined /></a>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><TwitterOutlined /></a>
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
              <h3 style={{color:"white"}}>Start your Kahoot clone!</h3>
              <p>start create your amazing website with us! login into your account now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default LoginPage