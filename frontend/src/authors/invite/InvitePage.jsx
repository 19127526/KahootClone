import {useParams} from "react-router-dom";
import {postInviteInMember} from "../../apis/group/groupApi";
import {CLIENT_JOIN_GROUP_URL} from "../../configs/url";
import {useEffect} from "react";

const invitePage = () => {
  let {name, code, email} = useParams();
  useEffect(() => {
    postInviteInMember({email: email, code: code, url: CLIENT_JOIN_GROUP_URL + name})
  }, [])

  console.log(name, code, email)
  return (<div>
    haha
  </div>)
}
export default invitePage