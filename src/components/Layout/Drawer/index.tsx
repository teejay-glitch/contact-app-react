import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTES } from "../../../routes/routes";

const DRAWER_WIDTH = 240;

type SideBarProps = {
    open: boolean;
    toggleSidebar: () => void;
};

const SideBar: React.FC<SideBarProps> = ({ open, toggleSidebar }: SideBarProps) => {
    return (
        <React.Fragment>
            <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ position: "absolute", left: 16, top: 16 }}>
                <MenuIcon />
            </IconButton>

            <Drawer
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                    },
                }}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={toggleSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <List>
                    {ROUTES.map((route) => (
                        <ListItemButton key={route.id} style={{ padding: 0 }}>
                            <Link to={route.path} style={{ textDecoration: "none", width: "100%" }}>
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%", padding: "8px" }}>
                                    <ListItemText primary={route.name} />
                                </Box>
                            </Link>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </React.Fragment>
    );
};

export default SideBar;
