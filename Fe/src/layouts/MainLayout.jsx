import {Drawer, Layout} from "antd";
import React from "react";
import RoutesPage from "../routes/Routes";
import {getWindowHeight, getWindowWidth} from "../utils/utils";
import {Col, Row} from "react-bootstrap";

const {Header, Footer, Content} = Layout;

const MainLayout = () => {
  return (
    <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
      <Col xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>

          <Layout>
            <Row xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
              <Col xl={12} sm={12} md={12} xs={12} lg={12} xxl={12}>
                <Header style={{}}>

                </Header>
              </Col>
            </Row>
            <Content style={{
              minHeight: getWindowHeight().innerHeight,
            }}>
              <RoutesPage/>
            </Content>
            <Footer style={{textAlign: 'center',background:"black",color:"white"}}
                    className=" site-layout-background">
              hahah
            </Footer >
          </Layout>

      </Col>
    </Row>
  );
}

export default MainLayout;
