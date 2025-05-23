import { Card, Col, Flex, Modal, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useAuth } from "../contexts/AuthContext";

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const { authUser } = useAuth();

    const getUserMenu = async () => {
        try {
            console.log(authUser);
            const response = await axios.get("http://localhost:4000/menu/get-user-menu", {
                params: { userId: authUser }
            });
            console.log(response.data);
            setMenus(response.data);
        } catch (error) {
            console.error("Failed to fetch user menu:", error);
        }
    };

    useEffect(() => {
        getUserMenu();
    }, []);

    return (
        <>
            <div style={{ marginTop: 40 }}>
                <div style={{ display: "flex", gap: 20 }}>
                    {menus.map((menu) => {
                        return (
                            <>
                                <MenuCard
                                    menu={menu}
                                    key={menu.menu_id}
                                    showDelete={true}
                                    onDelete={getUserMenu}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default MenuList;
