import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {addUrlGuard, removeUrlGuard} from "./AuthenticateRoutes.actions";
import Notification from "../components/notification/Notification";
import * as constraintNotification from "../components/notification/Notification.constraints";



const Authenticate = ({children, path}) => {
  const data = useSelector((state) => state.loginPage);
  const dispatch=useDispatch();
  const isLogin=data.isLogin;
  const location=useLocation();
  if(isLogin===false || !localStorage.getItem("accessToken")){
    if(location.pathname.includes("verify")){
      Notification("Notification","Please login to join group", constraintNotification.NOTIFICATION_TITLE)
    }
    dispatch(addUrlGuard({url:location.pathname}))
  }
  return (
    (isLogin === true && localStorage.getItem("accessToken")) ?
      {...children}:
      <Navigate to="/login" replace />
  )
}

export default Authenticate