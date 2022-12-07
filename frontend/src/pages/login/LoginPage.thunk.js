import * as actions from "./LoginPages.actions"
import {postLoginNormal} from "../../apis/login/loginApi";
import * as constraints from "./LoginPage.constraints"
import request from "../../apis/request";
import registerUser from "../../service/socket";




export const loginNormal = (payload) => dispatch => {
  console.log(payload)
  return postLoginNormal({email: payload.username, password: payload.password})
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data.jsonWebToken);
        localStorage.setItem("accessToken", res.data.jsonWebToken.accessToken);
        registerUser();
        return dispatch(actions.loginNormalSuccess(res.data.accountDto));
      } else if (res.response.status == 400) {
        return dispatch(actions.loginNormalFail());
      }
    })
    .catch((err) => {
      return dispatch(actions.loginNormalFail())
    })
}

export const loginGoogle = (payload) => dispatch => {
  localStorage.setItem("accessToken", payload.accessToken);
  return dispatch(actions.loginGoogleSuccess(payload.decoded))

}


