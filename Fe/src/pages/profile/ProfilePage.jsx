import {Row} from "react-bootstrap";
import {Avatar} from "antd";
import GroupComponent from "../../components/group/GroupComponent";

const ProfilePage = () => {
  return (
    <div className="container-profile">
      <div className="wrap-profile mb-3">
        <Row>
          <h1 style={{textAlign:"center"}}>Profile</h1>
        </Row>
        <Row className="d-flex justify-content-center mt-2">
          <Avatar size={105}
                  src="https://yt3.ggpht.com/ytc/AMLnZu9tBVuzay5LAvsf-dQz4uHepY7NfnXARBbVXBeibg=s900-c-k-c0x00ffffff-no-rj"/>
          <b className="text-center">
            Thanh Son
          </b>
          <text className="text-center" style={{fontWeight: "200", fontSize: "12px"}}>
            Members
          </text>
        </Row>
      </div>
      <div className="wrap-profile">
        <Row>
          <GroupComponent title={"Joined Groups"}/>
        </Row>
        <Row>
          <GroupComponent title={"Created Groups"}/>
        </Row>
      </div>
    </div>
  )
}

export default ProfilePage;