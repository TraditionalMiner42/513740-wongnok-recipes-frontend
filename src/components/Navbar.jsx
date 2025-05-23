import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [current, setCurrent] = useState("/");
    const items = [
        {
            label: "Home",
            key: "/",
            icon: <HomeOutlined />
        },
        {
            label: "My Menu",
            key: "/mymenu",
            icon: <UserOutlined />,
            children: [
                {
                    label: "Create Menu",
                    key: "/create-menu"
                },
                {
                    label: "Manage Menu",
                    key: "/manage-menu"
                }
            ]
        },
        {
            key: "signout",
            icon: <LogoutOutlined />,
            danger: true
        }
    ];
    const { Logout } = useAuth();
    const navigate = useNavigate();

    const onClick = (e) => {
        setCurrent(e.key);
        console.log("Navigating to:", e.key);

        if (e.key === "signout") {
            Logout();
            navigate("/signin");
        } else {
            navigate(e.key); // Use e.key here
        }
    };

    return (
        <>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                className="navbar-container"
            />
        </>
    );
};

export default Navbar;
