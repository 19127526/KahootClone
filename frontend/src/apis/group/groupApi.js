import {DETAIL_GROUP_API} from "../../configs/url";
import request from "../request";

export const getDetailGroup= async ({name})=>{
  return await request.get(DETAIL_GROUP_API+name);
}