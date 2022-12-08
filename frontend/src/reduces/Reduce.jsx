import {combineReducers} from "redux";
import {LoginPageReducer} from "../pages/login/LoginPage.reducer"
import {OtpComponentReducer} from "../components/otp/OtpComponent.reducer"
import {AuthenticateRoutesReducer} from "../guards/AuthenticateRoutes.reducer";
import {ChartSiderReducer} from "../components/chart/Sider/ChartSider.reducer";

const rootReducer = combineReducers({
    loginPage: LoginPageReducer,
    otpComponent: OtpComponentReducer,
    authenticateRoutes: AuthenticateRoutesReducer,
    chartSiderRoutes:ChartSiderReducer
})

export default rootReducer