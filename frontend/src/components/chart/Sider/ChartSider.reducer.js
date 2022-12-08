import * as types from "./ChartSider.constraints"
import produce from "immer"

const initialState= {
  isLoadingChart:true
}
export const ChartSiderReducer=(state=initialState, action)=>
  produce(state, draft => {
    switch (action.type) {
      case types.RE_RENDER_CHART:
        draft.isLoadingChart=!draft.isLoadingChart
        break;
      default:
        return state;
    }
  })

