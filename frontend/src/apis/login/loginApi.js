import request from "../request";
import {GET_LOGIN_OAUTH2, INFORMATION_LOGIN_GOOGLE_URI, LOGIN_NORMAL} from "../../configs/url";


export const  getLogin= async ()=>{
  return await request.get(GET_LOGIN_OAUTH2);
}

export const postLoginNormal=async ({email,password})=>{
  return await request.post(LOGIN_NORMAL,{email:email,password:password});
}

export const getInformationLoginGoogle=async ()=>{
  return await request.get(INFORMATION_LOGIN_GOOGLE_URI);
}