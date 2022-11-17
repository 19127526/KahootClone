import {Layout} from "antd";
import React from "react";
import RoutesPage from "../routes/Routes";
import {getWindowHeight} from "../utils/utils";
import {Col, Row} from "react-bootstrap";
import NavBar from "../components/navbar/NavBar";

const {Header, Footer, Content} = Layout;

const MainLayout = () => {
  return (
    <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
      <Col xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
        <Layout>
          <Header style={{background:"white",minHeight:"100px"}}>
            <NavBar/>
          </Header>
          <Content style={{
            minHeight: getWindowHeight().innerHeight,
<<<<<<< HEAD
<<<<<<< HEAD
            background:"white"
=======
=======
>>>>>>> parent of 7c573bc (fix layout)
            background: "linear-gradient(-135deg,#c850c0,#4158d0)"
>>>>>>> parent of 7c573bc (fix layout)
          }}>
            <RoutesPage/>
          </Content>
          <Footer style={{textAlign: 'center', background: "linear-gradient(-135deg,#c850c0,#4158d0)", color: "white",border:"1px solid black"}}
                  className=" site-layout-background">
            Footer
          </Footer>
        </Layout>

      </Col>
    </Row>
  );
}

export default MainLayout;
