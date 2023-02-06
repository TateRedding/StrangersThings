import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);