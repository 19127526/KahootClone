
import * as types from "./AuthenticateRoutes.constraints"


export const addUrlGuard=(payload)=>({
  type:types.ADD_URL,
  payload
})

export const removeUrlGuard=()=>({
  type:types.REMOVE_URL,
})
