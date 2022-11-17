import {Layout} from "antd";
import React from "react";
import RoutesPage from "../routes/Routes";
import {getWindowHeight} from "../utils/utils";
import {Row} from "react-bootstrap";
import HeaderComponent from "../components/header/HeaderComponent";
import FooterComponent from "../components/footer/FooterComponent";

const {Header, Footer, Content} = Layout;

const MainLayout = () => {
  return (
    <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
      <Layout>
        <body>
        <Header>
          <HeaderComponent/>
        </Header>
        <Content style={{minHeight: getWindowHeight().innerHeight, minWidth: "100%"}}>
          <RoutesPage/>
        </Content>
        <Footer>
          <FooterComponent/>
        </Footer>
        </body>
      </Layout>
    </Row>
  );
}
export default MainLayout;
