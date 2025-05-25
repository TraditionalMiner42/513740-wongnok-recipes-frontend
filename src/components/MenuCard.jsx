import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, List, Typography, Tag, Modal, Button, Rate } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Rating from "./Rating";
const { Title, Text } = Typography;

const MenuCard = ({ menu, showDelete = false, onDelete, authUser = null }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = async (e) => {
        console.log(e);
        const response = await axios.delete(`http://localhost:4000/menu/delete-menu/`, {
            params: { menuId: menu.menu_id }
        });
        console.log(response.data);
        onDelete();
        setModalVisible(false);
    };

    const handleCancel = (e) => {
        console.log(e);
        setModalVisible(false);
    };

    // const avgRating = calculateAverageRating(menu.ratings);

    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const total = ratings.reduce((acc, cur) => acc + cur.rating_number, 0);
        return total / ratings.length;
    };

    return (
        <>
            <Card
                hoverable
                style={{
                    width: 380,
                    height: 580,
                    margin: "12px"
                }}
                bodyStyle={{
                    padding: 0,
                    height: "calc(100% - 180px)", // Total height minus image height
                    display: "flex",
                    flexDirection: "column"
                }}
                cover={
                    <img
                        alt={menu.menu_name}
                        src={menu.image_url}
                        style={{
                            height: 180,
                            objectFit: "cover"
                        }}
                    />
                }>
                {/* Fixed Header Section */}
                <div
                    style={{
                        flexShrink: 0,
                        padding: "12px 16px"
                    }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 8
                        }}>
                        <Title level={4} style={{ margin: 0 }}>
                            {menu.menu_name}
                        </Title>
                        {showDelete && (
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <DeleteOutlined onClick={showModal} style={{ fontSize: 18 }} />
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: 0 }}>
                        <Tag color="blue" style={{ fontSize: 14 }}>
                            ⏱ {menu.duration} mins
                        </Tag>
                        <Tag color="green" style={{ fontSize: 14 }}>
                            💪 {menu.difficulty}
                        </Tag>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                marginLeft: "8px"
                            }}>
                            {menu.ratings && menu.ratings.length > 0 ? (
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                        {calculateAverageRating(menu.ratings).toFixed(1)}
                                    </Text>
                                    <Rate
                                        disabled
                                        allowHalf
                                        value={calculateAverageRating(menu.ratings)}
                                        style={{ fontSize: 14 }}
                                    />
                                </>
                            ) : (
                                <Text style={{ fontSize: 14, color: "#999" }}>No rating</Text>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Section */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "0 16px 16px 16px",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        minHeight: 0
                    }}
                    className="hide-scrollbar">
                    <Title level={4} style={{ marginBottom: 6, fontSize: 16, marginTop: 8 }}>
                        🧂 Ingredients
                    </Title>
                    <List
                        size="small"
                        split={false}
                        dataSource={menu.ingredients}
                        renderItem={(item) => (
                            <List.Item style={{ padding: "4px 0" }}>
                                <Text style={{ fontSize: 14 }}>
                                    {item.ingredient_name} - {item.quantity} {item.unit}
                                </Text>
                            </List.Item>
                        )}
                    />
                    <Title level={4} style={{ margin: "16px 0 6px", fontSize: 16 }}>
                        👨‍🍳 Steps
                    </Title>
                    <List
                        size="small"
                        split={false}
                        dataSource={menu.instructions.sort((a, b) => a.step_number - b.step_number)}
                        renderItem={(step) => (
                            <List.Item style={{ padding: "4px 0" }}>
                                <Text style={{ fontSize: 14 }}>
                                    <b>{step.step_number}.</b> {step.instruction}
                                </Text>
                            </List.Item>
                        )}
                    />
                    <Rating menu={menu} authUser={authUser} />
                </div>
            </Card>
            <Modal
                title="Do you want to delete "
                open={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}></Modal>
        </>
    );
};

export default MenuCard;
