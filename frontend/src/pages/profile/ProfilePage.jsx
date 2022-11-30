import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAddressCard, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {Row} from "react-bootstrap";
import GroupComponent from "../../components/group/GroupComponent";
import {useSelector} from "react-redux";

const ProfilePage = () => {
  const {profile} = useSelector(state => state.loginPage);


  return (

    <div className="container-profile">
      <div className="body__overlay"></div>
      <img src="img/body-img.jpg" alt="Hermoso fondo de pantalla" className="body__img"/>

      <div className="main-content">
        <aside className="main-content__left">
          <figure className="user-profile">
            <img className="user-profile__bg"
                 src="https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                 alt="fondo de pantalla"/>
            <img className="user-profile__img"
                 src={profile["imageURL"] ?? "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/anh-wibu.jpg?ssl=1"}
                 alt="Foto de Samuel Domínguez Juárez"/>
            <figcaption className="user-profile__info">
              <h1 className="user-profile__name" style={{textAlign:"center"}}>{profile.userName}</h1>
              {/*<p className="user-profile__ocupation"><strong>Full Stack Web</strong></p>*/}
              <p className="user-profile__tagline"  style={{textAlign:"center"}}><em>{profile.email}</em></p>
            </figcaption>
          </figure>
        </aside>

        <main className="main-content__right">
          <input type="radio" name="tab" id="tab-2" className="tab-2 profile" checked/>
          <input type="radio" name="tab" id="tab-3" className="tab-3 group"/>
          <nav className="navbar">
            <ul className="navbar__menu" onClick={value => console.log(value.target.title)} role="list">
              <li className="navbar__item " role="listitem">
                <label htmlFor="tab-2" className="navbar__link" role="label" title="profile">
                  <span>profile &nbsp;</span>
                  <FontAwesomeIcon icon={faAddressCard}/>
                </label>
              </li>
              <li className="navbar__item" role="listitem">
                <label htmlFor="tab-3" className="navbar__link" role="label" title="group">
                  <span>Group &nbsp;</span>
                  <FontAwesomeIcon icon={faUserGroup}/>
                </label>
              </li>
            </ul>
          </nav>
          <div className="tab-content-2">
            <section className="profile">
              <h1 style={{textAlign: "center"}} className="mb-2">Profile</h1>
              <p>
                Biệt danh:
              </p>
              <p> Sở thích: </p>
              <p></p>
              <br/>
            </section>
          </div>

          <div className="tab-content-3">
            <section className="group">
              <h1 style={{textAlign: "center"}} className="mb-2">Group</h1>
              <div className="wrap-profile">
                <Row>
                  <GroupComponent title={"Joined Groups"} type={"joined"} profile={profile}/>
                </Row>
                <Row>
                  <GroupComponent title={"Created Groups"} type={"created"} profile={profile}/>
                </Row>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfilePage;