import request from "../request";
import {FORGET_PASSWORD, FORGET_PASSWORD_EMAIL, FORGET_PASSWORD_OTP} from "../../configs/url";


export const postEmailForgotPassword=async ({email})=>{
  return await request.post(FORGET_PASSWORD_EMAIL,{email:email})
}

export const postOtpForgotPassword=async ({email,otp})=>{
  return await request.post(FORGET_PASSWORD_OTP,{email:email,otp:otp})
}

export const postForgotPassword=async ({email,otp,password})=>{
  return await request.post(FORGET_PASSWORD,{email:email,otp:otp,password:password})
}