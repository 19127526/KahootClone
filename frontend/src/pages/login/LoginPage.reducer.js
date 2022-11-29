import * as types from "./LoginPage.constraints"
import produce from "immer"

const initialState= {
  isLogin:false,
  profile: {}
}
export const LoginPageReducer=(state=initialState,action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.LOGIN_NORMAL_SUCCESS:
        draft.isLogin=true;
        draft.profile=action.payload;
        break;
      case types.LOGIN_NORMAL_FAIL:
       break;
      case types.LOGIN_GOOGLE_SUCCESS:
        draft.isLogin=true;
        draft.profile=action.payload;
        break;
      case types.LOGIN_GOOGLE_FAIL:
        break;
      case types.CHANGE_IS_LOGIN:
        draft.isLogin=false;
        break;
      default:
        return state;
    }
  })

