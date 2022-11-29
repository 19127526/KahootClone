import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {addUrlGuard} from "./AuthenticateRoutes.actions";



const Authenticate = ({children, path}) => {
  const data = useSelector((state) => state.loginPage);
  const dispatch=useDispatch();
  const isLogin=data.isLogin;
  if(isLogin===false && !localStorage.getItem("accessToken")){
    dispatch(addUrlGuard({url:path}))
  }
  return (
    (isLogin === true && localStorage.getItem("accessToken")) ?
      {...children}:
      <Navigate to="/login" replace />
  )
}

export default Authenticate