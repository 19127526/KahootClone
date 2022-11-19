import * as types from "./LoginPage.constraints"
import produce from "immer"

const initialState= {
  username:null,
  password:null,
  isLogin:false,
}
export const LoginPageReducer=(state=initialState,action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_SUCCESS:
        draft.username= action.payload.username;
        draft.password=action.payload.password;
        draft.isLogin=true;
        break;
      case types.LOGIN_FAIL:
       break;
      case types.CHANGE_IS_LOGIN:
        draft.isLogin=false;
        break;
      default:
        return state;
    }
  })

