import React from "react";
import "./App.css";
import Main from "./components/Layout/Main";
import ContactPage from "./pages/Contact";
import { Route, Routes } from "react-router-dom";
import { Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <Main>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<ContactPage />} />
                <Route path="*" element={<Typography variant="h5">Path not found.</Typography>} />
            </Routes>
        </Main>
    );
}

export default App;
