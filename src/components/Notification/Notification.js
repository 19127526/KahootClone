import { notification } from "antd";

const Notification = (title, description) => {
  return notification.success({
    message: title,
    description
  });
};

export default Notification;
