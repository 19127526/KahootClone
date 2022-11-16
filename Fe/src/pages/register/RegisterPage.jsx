import {Card, CardImg, Col, Container, Row} from "react-bootstrap";
import image from "../../assets/image/background.svg"
import {Button, Checkbox, Form, Input} from "antd";

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
            <Row style={{alignItems:"center", justifyContent: "space-around"}}>
                <Col sm={12} xl={6} xs={12} xxl={6} md={6}>
                        <Col sm={12} xl={12} xs={12} xxl={12}>
                            <h3 className="mb-3">Sign up</h3>
                            <p>If you already have an account</p>
                            <p>You can <a style={{color: "blue"}}>Login here!</a></p>
                        </Col>
                        <Col sm={12} xl={12} xs={12} xxl={12} md={6}>
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
                                    <Input/>
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
                                    label="Confirm password"
                                    name="confirm-password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password/>
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                >
                                    <Checkbox>Remember me</Checkbox>
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
                        </Col>
                </Col>
                <Col xl={6} xxl={6} md={6} xs={12} sm={12}>
                    <CardImg src={image} style={{padding: 10}}/>
                </Col>
            </Row>
    )
}


export default RegisterPage