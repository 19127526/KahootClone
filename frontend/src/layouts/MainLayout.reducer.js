import * as types from "./MainLayout.constraints"
import produce from "immer"

const initialState= {
  isLoading:false
}
export const MainLayoutReducer=(state=initialState, action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_IS_LOADING:
        draft.isLoading=!draft.isLoading;
        break;
      case types.TURN_ON_IS_LOADING:
        draft.isLoading=true;
        break;
      case types.TURN_OFF_IS_LOADING:
        draft.isLoading=false;
        break;
      default:
        return state;
    }
  })

