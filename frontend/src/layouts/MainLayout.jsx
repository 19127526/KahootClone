import {Layout} from "antd";
import React from "react";
import RoutesPage from "../routes/Routes";
import {getWindowHeight} from "../utils/utils";
import {Col, Container, Row} from "react-bootstrap";
import HeaderComponent from "../components/header/HeaderComponent";
import {useLocation} from "react-router-dom";
import AsideComponent from "../components/aside/AsideComponent";


const {Header, Footer, Content} = Layout;

const MainLayout = () => {
  const location = useLocation();

  return (
  /*  <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
      <Col xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
        <Layout>
          <HeaderComponent/>
          {/!*<Header style={{background:"white",minHeight:"100px"}}>
            <NavBar/>
          </Header>*!/}
          <Content style={{
            // background: "linear-gradient(-135deg,#c850c0,#4158d0)",
            animation:"gradient 15s ease infinite"
          }}>
            <Container className="container-content">
              <RoutesPage/>
            </Container>
          </Content>
          {/!*<Footer style={{textAlign: 'center', background: "linear-gradient(-135deg,#c850c0,#4158d0)", animation:"gradient 15s ease infinite",color: "white",border:"1px solid black"}}*!/}
          {/!*        className=" site-layout-background">*!/}
          {/!*  Footer*!/}
          {/!*</Footer>*!/}
        </Layout>

      </Col>
    </Row>*/

    <div className="main-wrapper">
      <div className="app" id="app">
        {location.pathname.includes("login") ?
          <RoutesPage/> :
          <>
            <HeaderComponent/>
            <AsideComponent/>
            <div className="sidebar-overlay" id="sidebar-overlay"></div>
            <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
            <div className="mobile-menu-handle"></div>
            <RoutesPage/>
          </>
        }

      </div>
    </div>

  );
}

export default MainLayout;
