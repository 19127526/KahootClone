import * as actions from "./LoginPages.actions"


export const getUserNameAndPassword=(payload)=>dispatch=>{
  if(payload.username==="huy"&&payload.password==="mom"){
    localStorage.setItem("accessToken","huymom");
    return dispatch(actions.loginSuccess(payload));
  }
  return dispatch(actions.loginFail());
}

