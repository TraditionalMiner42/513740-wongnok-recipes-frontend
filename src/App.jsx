import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import RegisterPage from "./pages/Register";
import Homepage from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/MainLayout";
import MyMenu from "./pages/CreateMenu";
import PrivateRoute from "./routes/PrivateRoute";
import CreateMenu from "./pages/CreateMenu";
import ManageMenu from "./pages/ManageMenu";
import MenuList from "./pages/ManageMenu";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Homepage />}></Route>
                            <Route element={<PrivateRoute />}>
                                <Route path="/create-menu" element={<CreateMenu />}></Route>
                                <Route path="/manage-menu" element={<MenuList />}></Route>
                            </Route>
                        </Route>
                        <Route path="/signin" element={<SigninPage />}></Route>
                        <Route path="/register" element={<RegisterPage />}></Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    );
};

export default App;
