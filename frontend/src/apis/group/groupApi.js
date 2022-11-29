import {
  DETAIL_GROUP_API,
  INVITE_MEMBER_INTO_GROUP,
  LIST_GROUP_CREATED_API,
  LIST_GROUP_JOINED_API
} from "../../configs/url";
import request from "../request";

export const getDetailGroup= async ({name})=>{
  return await request.get(DETAIL_GROUP_API+name);
}

export const postInviteInMember=async ({url,email,code})=>{
  return await request.post(INVITE_MEMBER_INTO_GROUP,{url:url,email:email,code:code});
}

export const getListGroup=async ({type,email})=>{
  return await request.get(type == "joined" ? LIST_GROUP_JOINED_API + `?email=${email}` : LIST_GROUP_CREATED_API  + `?email=${email}`)

}