import { notification } from "antd";
import * as constraints from "./Notification.constraints"


const Notification = (title, description,status) => {
  if(status===constraints.NOTIFICATION_SUCCESS){
    return notification.success({
      message: title,
      description
    });
  }
  else if(status===constraints.NOTIFICATION_WARN){
    return notification.warn({
      message: title,
      description
    });
  }
  else if(status===constraints.NOTIFICATION_ERROR){
    return notification.error({
      message: title,
      description
    });
  }

};

export default Notification;
