import axios from "axios";
import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import SearchMenu from "../components/SearchMenu";

const Homepage = () => {
    const [menus, setMenus] = useState([]);
    const { authUser } = useAuth();
    const [filteredMenus, setFilteredMenus] = useState([]);
    // const location = useLocation();

    const getAllUsersMenu = async () => {
        try {
            console.log("auth user: ", authUser);
            try {
                const response = await axios.get("http://localhost:4000/menu/get-users-menu");
                console.log(response.data);
                setMenus(response.data);
                setFilteredMenus(response.data);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.error("Failed to fetch user menu:", error);
        }
    };

    useEffect(() => {
        getAllUsersMenu();
    }, []);

    return (
        <>
            <div style={{ paddingTop: 40 }}>
                <SearchMenu menus={menus} onSearchResult={setFilteredMenus} />
                {menus.length === 0 && <p>No menus found.</p>}
                <div style={{ marginTop: 40 }}>
                    <div style={{ display: "flex", gap: 20 }}>
                        {filteredMenus.map((menu) => {
                            return (
                                <>
                                    <MenuCard
                                        menu={menu}
                                        key={menu.menu_id}
                                        onDelete={getAllUsersMenu}
                                        authUser={authUser}
                                    />
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;
