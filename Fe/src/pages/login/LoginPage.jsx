import {Col, Container, Row} from "react-bootstrap";
import image from "../../assets/image/Login.png"
import {Button, Checkbox, Form, Input} from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Container className="mt-2" style={{display: "flex", justifyContent: "space-between",position:"relative"}}>
      <Row>
        <Col sm={12} xl={6} xs={12} xxl={12} md={6} style={{position:"absolute"}} >
          <h1>Sign in</h1>
          <p>If you don't have an account register</p>
          <p>You can <b style={{color: "blue"}}>Register here!</b></p>
          <Form
            name="basic"
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"

              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xl={6} xxl={6} md={6} xs={12} sm={12} style={{position:"absolute",right:0,display:"flex",justifyContent:"end"}}>
          <img src={image} style={{height:"100%",width:'calc(100% - 30px)'}}/>
        </Col>
      </Row>
    </Container>
  )
}


export default LoginPage