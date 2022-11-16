import {Col, Row} from "react-bootstrap";
import image from "../../assets/image/Login.png"
import {Button, Checkbox, Form, Input} from "antd";

const LoginPage=()=>{
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return(
    <Row>
      <Col sm={12} xl={6} xs={12} xxl={6} md={6}>
        <Row>
          <Col sm={12} xl={12} xs={12} xxl={12}>
            <h1>Sign in</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} xl={12} xs={12} xxl={12} md={6} >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
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
                <Input />
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
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col  xl={6}  xxl={6}>
        <img src={image}/>
      </Col>
    </Row>
  )
}


export default LoginPage