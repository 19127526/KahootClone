import {Navigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getLogin} from "../../apis/login/login";

const Oauth2Page=()=>{
  const [flag,setFlag]=useState(false)
  useEffect(()=>{
    getLogin()
      .then(response=>console.log(response))
      .catch(error=>console.log(error))
  },[])
  return null;
}

export default Oauth2Page