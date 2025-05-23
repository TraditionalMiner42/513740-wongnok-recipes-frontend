import { Alert, Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useAuth } from "../contexts/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Password from "antd/es/input/Password.js";

const SigninPage = () => {
    const [form] = Form.useForm();
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { Login } = useAuth();

    const onFinish = async (values) => {
        console.log("Success:", values);
        try {
            const response = await axios.post("http://localhost:4000/auth/signin", {
                username: values.username,
                password: values.password
            });
            console.log(response.data);
            if (response.data) {
                Login(response.data.userId);
                setSuccess(response.data.message);
                setError(null);
                setTimeout(() => {
                    navigate("/");
                });
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                setError(null);
                setTimeout(() => {
                    setError(error.response.data.message);
                }, 10);
                setSuccess(null);
            }
        }
    };

    return (
        <>
            {success && (
                <Alert
                    message={success}
                    type="success"
                    className="success-message"
                    showIcon
                    closable></Alert>
            )}
            {error && (
                <Alert
                    message={error}
                    type="error"
                    className="error-message"
                    showIcon
                    closable></Alert>
            )}
            <div className="form-container">
                <Form form={form} onFinish={onFinish} style={{ width: 400 }}>
                    <FormItem
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}>
                        <Input placeholder="Username"></Input>
                    </FormItem>
                    <FormItem
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input type="password" placeholder="Password"></Input>
                    </FormItem>
                    <FormItem>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                            <Checkbox>Remember me</Checkbox>
                            <a href="">Forgot password</a>
                        </div>
                    </FormItem>
                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 10
                            }}>
                            <Button type="primary" htmlType="submit">
                                Log in
                            </Button>
                            <a href="/register">register now!</a>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SigninPage;
