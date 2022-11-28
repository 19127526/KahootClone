import {combineReducers} from "redux";
import {LoginPageReducer} from "../pages/login/LoginPage.reducer"
import {OtpComponentReducer} from "../components/otp/OtpComponent.reducer"
const rootReducer = combineReducers({
  loginPage:LoginPageReducer,
  otpComponent:OtpComponentReducer
})

export default rootReducer