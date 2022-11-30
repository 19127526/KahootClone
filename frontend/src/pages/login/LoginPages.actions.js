
import * as types from "./LoginPage.constraints"


export const loginNormalSuccess=(payload)=>({
  type: types.LOGIN_NORMAL_SUCCESS,
  payload
})

export const loginNormalFail=()=>({
  type: types.LOGIN_NORMAL_FAIL,
})

export const logoutAccount=()=>({
  type: types.LOGOUT_ACCOUNT
})

export const loginGoogleSuccess=(payload)=>({
  type: types.LOGIN_GOOGLE_SUCCESS,
  payload
})

export const loginGoogleFail=()=>({
  type: types.LOGIN_GOOGLE_FAIL,
})


export const changeIsLogin=()=>({
  type:types.CHANGE_IS_LOGIN
})
