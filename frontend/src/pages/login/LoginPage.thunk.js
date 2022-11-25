import * as actions from "./LoginPages.actions"


export const loginNormal=(payload)=>dispatch=>{
  if(payload.username==="huy"&&payload.password==="mom"){
    localStorage.setItem("accessToken","huymom");
    return dispatch(actions.loginNormalSuccess(payload));
  }
  return dispatch(actions.loginNormalFail());
}

export const loginGoogle=(payload)=>dispatch=>{
  localStorage.setItem("accessToken",payload.accessToken);
  return dispatch(actions.loginGoogleSuccess())

}

