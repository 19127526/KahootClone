import {useNavigate, useParams} from "react-router-dom";
import {postInviteInMember} from "../../apis/group/groupApi";
import {CLIENT_JOIN_GROUP_URL, DETAIL_GROUP_URI, JOINED_GROUP_URI} from "../../configs/url";
import {useEffect} from "react";
import Notification from "../../components/notification/Notification";
import * as constraintNotification from "../../components/notification/Notification.constraints";
import Loading from "../../components/loading/LoadingComponent";
import {useSelector} from "react-redux";

const invitePage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let {id, code, email} = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    postInviteInMember({email: email, code: code, id:id})
      .then(response => {
        Notification("Thông báo lời mời", "Join thành công", constraintNotification.NOTIFICATION_SUCCESS);
        return navigate(JOINED_GROUP_URI);
      })
      .catch(error => Notification("Thông báo lời mời", "Join thất bại", constraintNotification.NOTIFICATION_ERROR))
  }, [])

  return (<Loading/>);
}
export default invitePage