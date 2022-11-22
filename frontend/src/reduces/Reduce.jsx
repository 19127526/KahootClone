import {combineReducers} from "redux";
import {LoginPageReducer} from "../pages/login/LoginPage.reducer"
const rootReducer = combineReducers({
  loginPage:LoginPageReducer
})

export default rootReducer