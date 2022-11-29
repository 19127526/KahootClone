import * as types from "./AuthenticateRoutes.constraints"
import produce from "immer"

const initialState= {
  url:"/",

}
export const AuthenticateRoutesReducer=(state=initialState, action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.ADD_URL:
        draft.url=action.payload.url;
        break;
      case types.REMOVE_URL:
        draft.url="/"
       break;
      default:
        return state;
    }
  })

