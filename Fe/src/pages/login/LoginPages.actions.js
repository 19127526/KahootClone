
import * as types from "./LoginPage.constraints"


export const loginSuccess=(payload)=>({
  type: types.LOGIN_SUCCESS,
  payload
})

export const loginFail=()=>({
  type: types.LOGIN_FAIL,
})
export const changeIsLogin=()=>({
  type:types.CHANGE_IS_LOGIN
})
