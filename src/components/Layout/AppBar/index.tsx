import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    background: "linear-gradient(45deg, #4e8ef7, #3a78c2)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    flexGrow: 1,
}));

type HeaderProps = {
    toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }: HeaderProps) => {
    return (
        <CustomAppBar position="sticky">
            <Toolbar>
                <MenuButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                    <MenuIcon />
                </MenuButton>

                <Title variant="h6" noWrap>
                    Contact Management
                </Title>
            </Toolbar>
        </CustomAppBar>
    );
};

export default Header;
