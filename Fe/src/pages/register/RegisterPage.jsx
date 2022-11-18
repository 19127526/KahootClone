import {Col, Container, Row} from "react-bootstrap";
import {
    FacebookOutlined,
    GoogleOutlined,
    LockOutlined,
    MailOutlined,
    TwitterOutlined,
    UserOutlined
} from '@ant-design/icons';
import image from "../../assets/image/background.svg"
import {Button, Form, Input} from "antd";

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        /*<Container>
            <Row>
                <Col sm={12} xl={6} xs={12} xxl={6} md={6}
                     style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Container>
                        <h3 className="mb-3">Sign up</h3>
                        <p>If you already have an account</p>
                        <p>You can <a href="/login" style={{color: "blue"}}>Login here!</a></p>
                        <Form
                            name="basic"
                            layout="vertical"
                            requiredMark={false}
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
                            size={"large"}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input bordered={true} placeholder="Enter your email address"
                                       prefix={<MailOutlined/>}/>
                            </Form.Item>

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
                                <Input placeholder="Enter your username" prefix={<UserOutlined/>}/>
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
                                <Input.Password placeholder="Enter your password" prefix={<LockOutlined/>}/>
                            </Form.Item>

                            <Form.Item
                                label="Confirm password"
                                name="confirm-password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Confirm your password" prefix={<LockOutlined/>}/>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Container>
                </Col>
                <Col xl={6} xxl={6} md={6} xs={6} sm={12}>
                    <img src={image} style={{
                        maxWidth: "110%",
                        marginTop: 10,
                        marginBottom: 10
                    }}
                         alt=""
                    />
                </Col>
            </Row>
        </Container>*/
      <div className="main-container">
          <div className="login-wrapper">
              <div className="left-container">
                  <div className="header">
                  </div>
                  <div className="main">
                      <h2>Register</h2>
                      <p>Welcome! Please fill information to sign up account. you can sign in <a href="/login" style={{textDecorationLine: "underline"}}>here</a></p>

                      <form action="">
                          <Input type="email" name="mail" placeholder="Type your email"/>
                          <Input type="username" name="username" placeholder="Type your username"/>
                          <Input type="password" name="password" placeholder="Type your password"/>
                          <Input type="password" name="confirm_password" placeholder="Confirm your password"/>
                          <div className="forgotPass">
                          </div>
                          <div className="login-now">
                              <a href="#">Register</a>
                          </div>
                          <span className="line"> </span>
                      </form>
                  </div>
              </div>
              <div className="side-container">
                  <div className="side-text-container">
                      <div className="short-line">
                          <hr/>
                      </div>
                      <div className="text">
                          <h3 style={{color:"white"}}>Start your Kahoot clone!</h3>
                          <p>start create your amazing website with us! login into your account now</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}


export default RegisterPage