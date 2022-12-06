import request from "../request";
import {REGISTER_URi, VALIDATE_OTP_URI} from "../../configs/url";


export const postRegisterApi= async ({userName,password,email})=>{
  return await request.post(REGISTER_URi,{userName:userName,password:password,email:email});
}

export const postValidateOtp= async ({email,otp})=>{
  return await request.post(VALIDATE_OTP_URI,{email:email,otp:otp})
}

