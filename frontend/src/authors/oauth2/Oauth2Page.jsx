import {Navigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getInformationLoginGoogle, getLogin} from "../../apis/login/loginApi";
import Loading from "../../components/loading/LoadingComponent";

const Oauth2Page=()=>{
  const [flag,setFlag]=useState(false);
  useEffect(()=>{
  /*  getInformationLoginGoogle()
      .then(response=>console.log(response))
      .catch(error=>console.log(error))*/
    fetch('http://localhost:8080/account/auth/loginSocial')
      .then((response) => response.json())
      .then((data) => console.log(data));
  },[])
 return <>hello ba gia</>
}

export default Oauth2Page