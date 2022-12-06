import {Modal} from "antd";
import OtpComponent from "../../components/otp/OtpComponent";
import {GoogleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {LOGIN_URI} from "../../configs/url";

const SignUpPage=()=>{
  const navigate=useNavigate()
  return (
    <>
      <div className="auth">
        <div className="auth-container">
          <div className="card">
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
                         placeholder="Your email address" required /></div>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input type="text" className="form-control underlined" name="username" id="username"
                         placeholder="Your user name" required /></div>
                <div className="form-group has-error">
                  <label htmlFor="password">Password</label>
                  <div className="row">
                    <div className="col-sm-6">
                      <input type="password" className="form-control underlined" name="password" id="password"
                             placeholder="Enter password" required="" aria-describedby="pass-error" aria-invalid="true"/>
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control underlined" name="retype_password"
                             id="retype_password" placeholder="Re-type password" required=""
                             aria-describedby="pass-error" aria-invalid="true"/></div>
                  </div>
                  <span id="pass-error" className="has-error">Passwords should be at least 8 characters.</span>
                </div>
                <div className="form-group"  >
                  <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                </div>
                <div className="form-group">
                  <p className="text-muted text-center">Already have an account?
                    <a onClick={()=>navigate(LOGIN_URI)}>Login!</a>
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