import React, {useRef} from "react";
import emailjs from "@emailjs/browser";
import "./Email.css"
import {Input} from "antd";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints";
import {INVITE_URL_REDIRECT} from "../../configs/url";
const EmailComponent=({onSubmit,code,url,name})=>{
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
  return (
    <form className="form-email" ref={form} onSubmit={sendEmail}>
      <label style={{display:"none"}}>Name</label>
        <input type="text" name="user_name" value="Kahoot Clone" style={{display:"none"}}/>
        <label style={{display:"none"}}>Group</label>
        <input type="text" name="user_group" value={name} style={{display:"none"}}/>
        <label style={{display:"none"}}>Group</label>
        <input type="text" name="user_link_redirect" value={INVITE_URL_REDIRECT+"/"+name+"/"+code} style={{display:"none"}}/>
        <label>Email</label>
        <Input type="email" name="user_email"/>
        <label>Link Detail Group</label>
        <Input type="text" name="user_link"  value={url} readOnly={true} />
      <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
      <button type="submit"  className="mt-3 email-btn">Send Invite</button>
      </div>
    </form>
  );
}

export default EmailComponent