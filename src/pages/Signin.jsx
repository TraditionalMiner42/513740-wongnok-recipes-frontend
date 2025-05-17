import { Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

const SigninPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    return (
        <>
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
        </>
    );
};

export default SigninPage;
