import request from "../request";
import {
  LOGIN_NORMAL,
  LOGIN_OAUTH2,
} from "../../configs/url";



export const postLoginNormal=async ({email,password})=>{
  return await request.post(LOGIN_NORMAL,{email:email,password:password});
}


export const postLoginGoogle=async ({userName,email,imageURL})=>{
  return await request.post(LOGIN_OAUTH2,{userName:userName,email:email,imageURL:imageURL})
}


