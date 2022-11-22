import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Authenticate = ({children}) => {
  const data = useSelector((state) => state.loginPage);
  const isLogin = data.isLogin;
  return (
    (isLogin === true && localStorage.getItem("accessToken")) ? {...children}:<Navigate to="/login" replace />
  )
}

export default Authenticate