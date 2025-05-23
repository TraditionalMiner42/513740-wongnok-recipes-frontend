import { Button, Form, Input, message } from "antd";
import Alert from "antd/es/alert/Alert";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const [password] = useState("");
    const [confirmPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("Success:", values);
        try {
            const response = await axios.post("http://localhost:4000/auth/register", {
                username: values.username,
                password: values.password
            });
            if (response.data) {
                setSuccess(response.data.message);
                setError(null);
                setTimeout(() => {
                    navigate("/signin");
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            setError("Registration failed.");
            setSuccess(null);
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
                        <Input.Password value={password} placeholder="Password"></Input.Password>
                    </FormItem>
                    <FormItem
                        name="confirm"
                        rules={[
                            { required: true, message: "Please re-enter your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("The new password that you entered do not match!")
                                    );
                                }
                            })
                        ]}>
                        <Input.Password
                            value={confirmPassword}
                            placeholder="Confirm Password"></Input.Password>
                    </FormItem>
                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default RegisterPage;
