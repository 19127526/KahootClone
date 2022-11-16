import {Layout} from "antd";
import React from "react";
import RoutesPage from "../routes/Routes";

const {Header, Footer, Content} = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Header>header</Header>
      <Layout>
        <Content><RoutesPage/></Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default MainLayout;
