import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, InputNumber, Select, Space, Typography, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateMenu = () => {
    const [form] = useForm();
    const { Title, Paragraph } = Typography;
    const { authUser } = useAuth();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const difficultyLevel = ["Easy", "Normal", "Hard"];

    const onFinish = async (values) => {
        console.log(values);
        console.log(authUser);
        try {
            const response = await axios.post("http://localhost:4000/menu/create-menu", {
                menuName: values.menuName,
                imageUrl: values.imageUrl,
                userId: authUser,
                duration: values.duration,
                difficulty: values.difficulty,
                ingredients: values.ingredients,
                instructions: values.instructions
            });
            console.log(response.data);
            if (response.data) {
                setSuccess(response.data.message);
                setError(error);
                setTimeout(() => {
                    navigate("/manage-menu");
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="menu-form-container">
                <Card hoverable>
                    <Form form={form} onFinish={onFinish} style={{ width: 400 }}>
                        <Title level={3}>Create Your Menu</Title>
                        <Paragraph style={{ marginBottom: 50 }}>
                            Fill out the form below to add a new menu.
                        </Paragraph>
                        <Form.Item
                            name="menuName"
                            rules={[{ required: true, message: "Please input a menu name!" }]}>
                            <Input placeholder="Menu Name" />
                        </Form.Item>
                        <Form.Item name="imageUrl">
                            <Input placeholder="https://example.com/image.jpg" />
                        </Form.Item>
                        <Form.Item name="duration">
                            <Input placeholder="Duration" />
                        </Form.Item>
                        <Form.Item name="difficulty">
                            <Select placeholder="Select difficulty">
                                {difficultyLevel.map((option) => (
                                    <Select.Option key={option} value={option}></Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.List name="ingredients">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{ display: "flex" }}
                                            align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, "name"]}
                                                rules={[{ required: true }]}>
                                                <Input placeholder="Ingredient Name" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "quantity"]}
                                                rules={[{ required: true }]}>
                                                <InputNumber placeholder="Quantity" min={0} />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, "unit"]}>
                                                <Input placeholder="Unit" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}>
                                            Add Ingredient
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.List name="instructions">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{ display: "flex", width: "100%" }}
                                            align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, "stepNumber"]}
                                                rules={[{ required: true }]}>
                                                <InputNumber placeholder="Step #" min={1} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, "instruction"]}
                                                rules={[{ required: true }]}>
                                                <Input placeholder="Instruction" />
                                            </Form.Item>

                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}>
                                            Add Instruction
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                <div>Add Menu</div>
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default CreateMenu;
