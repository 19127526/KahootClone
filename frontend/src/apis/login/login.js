import request from "../request";
import {GET_LOGIN_OAUTH2} from "../../configs/url";


export const  getLogin= async ()=>{
  return await request.get(GET_LOGIN_OAUTH2);
}