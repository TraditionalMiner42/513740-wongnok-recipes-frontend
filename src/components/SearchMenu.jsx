import { AutoComplete, Input } from "antd";

const SearchMenu = ({ menus, onSearchResult }) => {
    const handleSearch = (values) => {
        if (!values.trim()) {
            onSearchResult(menus);
            return;
        }
        console.log("search values: ", values);
        console.log("menus values: ", menus);
        const filteredMenu = menus.filter((menu) => menu.menu_name.toLowerCase().includes(values));
        console.log(filteredMenu);
        onSearchResult(filteredMenu);
    };

    return (
        <>
            <AutoComplete
                //   options={options}
                //   onSearch={handleSearch}
                //   onSelect={onSelect}
                style={{ width: "100%" }}>
                <Input.Search
                    placeholder="Search Menu"
                    variant="filled"
                    style={{
                        display: "block",
                        width: "25%",
                        marginLeft: "auto",
                        marginRight: "auto   "
                    }}
                    onSearch={handleSearch}
                />
            </AutoComplete>
        </>
    );
};

export default SearchMenu;
