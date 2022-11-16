import {Layout} from "antd";
import React from "react";

const {Header, Footer, Content, Sider} = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Header>header</Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content>main content</Content>
        <Sider>right sidebar</Sider>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}

export default MainLayout;
