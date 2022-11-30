import {useNavigate, useParams} from "react-router-dom";
import {postInviteInMember} from "../../apis/group/groupApi";
import {CLIENT_JOIN_GROUP_URL, DETAIL_GROUP_URI} from "../../configs/url";
import {useEffect} from "react";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import Loading from "../../components/loading/LoadingComponent";

const invitePage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let {name, code, email} = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const url = CLIENT_JOIN_GROUP_URL + name;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    postInviteInMember({email: email, code: code, url: url})
      .then(response => {
        console.log(response)
        Notification("Thông báo lời mời", "Join thành công", constraintNotification.NOTIFICATION_SUCCESS);
        return navigate(DETAIL_GROUP_URI+name);
      })
      .catch(error => Notification("Thông báo lời mời", "Join thất bại", constraintNotification.NOTIFICATION_ERROR))
  }, [])

  console.log(name, code, email)
  return (<Loading/>);
}
export default invitePage