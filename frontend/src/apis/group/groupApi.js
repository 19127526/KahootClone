import {DETAIL_GROUP_API, INVITE_MEMBER_INTO_GROUP} from "../../configs/url";
import request from "../request";

export const getDetailGroup= async ({name})=>{
  return await request.get(DETAIL_GROUP_API+name);
}

export const postInviteInMember=async ({url,email,code})=>{
  return await request.post(INVITE_MEMBER_INTO_GROUP,{url:url,email:email,code:code});
}