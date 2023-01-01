import * as types from "./OtpComponent.constraints";
import {SEND_OTP_SOCIAL_LOGIN_SUCCESS} from "./OtpComponent.constraints";


export const sendOtpSuccess=()=>({
  type: types.SEND_OTP_SUCCESS,
})

export const sendOtpSocialLoginSuccess=(payload)=>({
  type: types.SEND_OTP_SOCIAL_LOGIN_SUCCESS,
  payload
})