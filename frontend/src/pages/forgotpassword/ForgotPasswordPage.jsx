import {LOGIN_URI, REGISTER_URI} from "../../configs/url";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Steps} from "antd";
import "./ForgotPasswordPage.css"
import {postEmailForgotPassword, postForgotPassword, postOtpForgotPassword} from "../../apis/forgot/forgotApi";
import {useDispatch} from "react-redux";
import {turnOffLoading, turnOnLoading} from "../../layouts/MainLayout.actions";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints"

const EnterEmail=({setCurrent,current})=>{
  const [email,setEmail]=useState("");
  const dispatch=useDispatch();
  const handleEmail=async (event)=>{
    event.preventDefault();
    dispatch(turnOnLoading());
    await postEmailForgotPassword({email:email})
      .then(res=>{
        if (res.status === 204) {
          setCurrent({current:current.current+1,state:{email:email}});
          Notification("Notification","Please enter otp",constraintNotification.NOTIFICATION_TITLE)
        }
        else{
          Notification("Notification","Error",constraintNotification.NOTIFICATION_ERROR)
        }
      })
      .catch(err=>{
        Notification("Notification",err.toString(),constraintNotification.NOTIFICATION_ERROR)
      })
      .finally(()=>{
        dispatch(turnOffLoading());
      })
  }
  return (
    <>
      <p className="text-center">Enter Email</p>
      <p className="text-muted text-center">
       <small>Enter your email address to reset your password.</small>
      </p>
      <form onSubmit={handleEmail}>
       <div className="form-group">
        <label htmlFor="email1">Email</label>
        <input type="email" className="form-control underlined" name="email1" id="email1"
               value={email}
               placeholder="Your email address" onChange={(e)=>setEmail(e.target.value)}/></div>
       <div className="form-group">
        <button type="submit" value="Submit" className="btn btn-block btn-primary" >Confirm</button>
       </div>
      </form>
       <div className="form-group clearfix">
        <a className="pull-left" >Return to Login</a>
        <a className="pull-right" >Sign Up!</a>
       </div>
    </>
  )
}

const EnterOtp=({setCurrent,current})=>{
  const dispatch=useDispatch();
  const [otp,setOtp]=useState("");
  const handleOtp=async (event)=>{
    event.preventDefault();
    dispatch(turnOnLoading());
    await postOtpForgotPassword({otp:otp,email:current?.state?.email})
      .then(res=>{
        if (res.status === 204) {
          setCurrent({current:current.current+1,state:{email:current?.state?.email,otp:otp}});
          Notification("Notification","Please enter password",constraintNotification.NOTIFICATION_TITLE)
        }
      })
      .catch(err=>{
        Notification("Notification",err.toString(),constraintNotification.NOTIFICATION_ERROR)
      })
      .finally(()=>{
        dispatch(turnOffLoading());
      })

  }
 return (
   <>
    <p className="text-center">Enter Otp</p>
    <p className="text-muted text-center">
     <small>Enter otp in your email</small>
    </p>
     <form onSubmit={handleOtp}>
     <div className="form-group">
      <label htmlFor="email1">Otp</label>
      <input type="text" className="form-control underlined" name="otp" id="otp"
             placeholder="Your otp" value={otp} onChange={(e)=>setOtp(e.target.value)}/></div>
     <div className="form-group">
      <button className="btn btn-block btn-primary" type="submit" value="Submit">Confirm</button>
     </div>
     </form>
   </>
 )
}

const EnterPassword=({setCurrent,current})=>{
  const dispatch=useDispatch();
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const handleNewPassword=async (event)=> {
    event.preventDefault();
    dispatch(turnOnLoading());
    await postForgotPassword({otp:current?.state?.otp,email:current?.state?.email,password:password})
      .then(res=>{
        console.log(res)
        if (res.status === 202) {
          navigate("/login")
          Notification("Notification",`Reset password of ${current?.state?.email} success`,constraintNotification.NOTIFICATION_SUCCESS)
        }
      })
      .catch(err=>{
        Notification("Notification",err.toString(),constraintNotification.NOTIFICATION_ERROR)
      })
      .finally(()=>{
        dispatch(turnOffLoading());
      })
  }

  return (
   <>
    <p className="text-center">RESET PASSWORD</p>
    <p className="text-muted text-center">
     <small>Enter your email address to reset your password.</small>
    </p>
     <form onSubmit={handleNewPassword}>
     <div className="form-group">
      <label htmlFor="email1">New password</label>
      <input type="password" className="form-control underlined" name="password" id="password"
             value={password}
             placeholder="Your new password" onChange={(e)=>setPassword(e.target.value)}/></div>
     <div className="form-group">
      <button type="submit" value="Submit" className="btn btn-block btn-primary">Reset</button>
     </div>
    </form>
   </>
 )
}

const ForgotPasswordPage=()=>{
 const navigate=useNavigate();
 const [current, setCurrent] = useState({current:0,state:{email:null,password:null,otp:null}});
 const next = () => {
  setCurrent({...current,current: current.current+1});
 };
 const prev = () => {
  setCurrent({...current,current: current.current-1});
 };
  const steps = [
    {
      title: 'First',
      content: EnterEmail({setCurrent,current}),
    },
    {
      title: 'Second',
      content: EnterOtp({setCurrent,current}),
    },
    {
      title: 'Last',
      content: EnterPassword({setCurrent,current}),
    },
  ];

 const items = steps.map((item) => ({
  key: item.title,
  title: item.title,
 }));
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

        <Steps current={current.current} items={items} />
        <div className="steps-content">{steps[current.current].content}</div>
        <div className="steps-action" style={{display:"flex",justifyContent:"space-between"}}>
          {current.current > 0 && (
            <Button
              type="link"
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
         {current.current === steps.length - 1 && (
           <Button type="primary" onClick={() => alert('Processing complete!')}>
            Done
           </Button>
         )}
        </div>
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