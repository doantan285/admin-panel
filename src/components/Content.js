import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Settings from "../pages/Settings";

const Content = () => {
    return (
        <div className="p-4 w-full bg-white">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    );
}

export default Content;