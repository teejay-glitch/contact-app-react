import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "../AppBar";
import SideBar from "../Drawer";

type MainProps = { children: React.ReactNode };

const Main: React.FC<MainProps> = ({ children }: MainProps) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <SideBar open={showSidebar} toggleSidebar={toggleSidebar} />

            <Header toggleSidebar={toggleSidebar} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
};

export default Main;
