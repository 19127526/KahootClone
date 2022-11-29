import * as actions from "./LoginPages.actions"
import {postLoginNormal} from "../../apis/login/loginApi";
import * as constraints from "./LoginPage.constraints"

export const loginNormal = (payload) => dispatch => {
  let isLoginSuccess = false;
  return postLoginNormal({email: payload.username, password: payload.password})
    .then((res) => {
      console.log(res)
      if (res.status == 200) {
        localStorage.setItem("accessToken", res.data.jsonWebToken.accessToken);
        isLoginSuccess = true;
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


