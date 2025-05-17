import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

const RegisterPage = () => {
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
                <FormItem
                    name="password"
                    rules={[{ required: true, message: "Please re-enter your password!" }]}>
                    <Input type="password" placeholder="Password"></Input>
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
        </>
    );
};

export default RegisterPage;
