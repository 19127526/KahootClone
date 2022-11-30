import {combineReducers} from "redux";
import {LoginPageReducer} from "../pages/login/LoginPage.reducer"
import {OtpComponentReducer} from "../components/otp/OtpComponent.reducer"
import {AuthenticateRoutesReducer} from "../guards/AuthenticateRoutes.reducer";

const rootReducer = combineReducers({
    loginPage: LoginPageReducer,
    otpComponent: OtpComponentReducer,
    authenticateRoutes: AuthenticateRoutesReducer
})

export default rootReducer