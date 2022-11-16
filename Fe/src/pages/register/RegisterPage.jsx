import {Col, Container, Row} from "react-bootstrap";
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
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
        <Container>
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
        </Container>
    )
}


export default RegisterPage