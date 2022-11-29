import {useParams} from "react-router-dom";

const invitePage=()=>{
  let {name,code,email}=useParams();
  console.log(name,code,email)

  return null
}
export default invitePage