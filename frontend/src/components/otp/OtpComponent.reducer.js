import * as types from "./OtpComponent.constraints"
import produce from "immer"

const initialState= {

}
export const OtpComponentReducer=(state=initialState,action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.SEND_OTP_SUCCESS:
        break;
      case types.SEND_OTP_SOCIAL_LOGIN_SUCCESS:
        break;
      default:
        return state;
    }
  })

