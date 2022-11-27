import React, {useRef} from "react";
import emailjs from "@emailjs/browser";
import "./Email.css"
import {Input} from "antd";
import {randomCharacter} from "../../utils/utils";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints";
const EmailComponent=({onSubmit})=>{
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_r2vgzud', 'template_rtrq4lr', form.current, 'KZ2451QXsxFbGeSSS')
      .then((result) => {
        console.log(result.text);
        console.log("sent");
        onSubmit();
        Notification("Thông báo email", "Gửi lời mời thành công",constraintNotification.NOTIFICATION_SUCCESS)
      }, (error) => {
        Notification("Thông báo email", error.text,constraintNotification.NOTIFICATION_WARN)
        console.log(error.text);
      });
  };
  const link=`http://localhost:3000/group/detail/${randomCharacter()}`
  return (
    <form className="form-email" ref={form} onSubmit={sendEmail}>
      <label style={{display:"none"}}>Name</label>
      <input type="text" name="user_name" value="Kahoot Clone" style={{display:"none"}}/>
      <label style={{display:"none"}}>Group</label>
      <input type="text" name="user_group" value="Chiếc thuyền ngoài xa" style={{display:"none"}}/>
      <label>Email</label>
      <Input type="email" name="user_email"/>
      <label>Link</label>
      <Input type="text" name="user_link"  value={link} readOnly={true} />
      <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <button type="submit"  className="mt-3 email-btn">Send Invite</button>
      </div>
    </form>
  );
}

export default EmailComponent