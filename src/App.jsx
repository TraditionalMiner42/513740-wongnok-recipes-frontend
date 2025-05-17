import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import RegisterPage from "./pages/Register";
import Homepage from "./pages/Home";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/signin" element={<SigninPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                    <Route path="/" element={<Homepage />}></Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
