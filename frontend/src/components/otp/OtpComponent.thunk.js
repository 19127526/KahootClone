import * as actionsOtp from "./OtpComponent.actions";
import * as actionsLogin from "../../pages/login/LoginPages.actions";


export const postOtp=(payload)=>dispatch=>{
  /*dispatch(actionsLogin.loginGoogleSuccess())*/
  return dispatch(actionsOtp.sendOtpSuccess())
}