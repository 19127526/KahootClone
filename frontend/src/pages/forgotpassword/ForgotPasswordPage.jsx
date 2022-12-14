import {Modal} from "antd";
import OtpComponent from "../../components/otp/OtpComponent";
import {LOGIN_URI, REGISTER_URI, REGISTER_URi} from "../../configs/url";
import {useNavigate} from "react-router-dom";


const ForgotPasswordPage=()=>{
 const navigate=useNavigate();
 return(
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
        <p className="text-center">RESET PASSWORD</p>
        <p className="text-muted text-center">
         <small>Enter your email address to reset your password.</small>
        </p>
        <form id="reset-form" action="https://modularcode.io/index.html" method="GET" noValidate="novalidate">
         <div className="form-group">
          <label htmlFor="email1">Email</label>
          <input type="email" className="form-control underlined" name="email1" id="email1"
                 placeholder="Your email address" required=""/></div>
         <div className="form-group">
          <button type="submit" className="btn btn-block btn-primary">Reset</button>
         </div>
         <div className="form-group clearfix">
          <a className="pull-left" onClick={()=>navigate(LOGIN_URI)}>Return to Login</a>
          <a className="pull-right" onClick={()=>navigate(REGISTER_URI)}>Sign Up!</a>
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



export default ForgotPasswordPage