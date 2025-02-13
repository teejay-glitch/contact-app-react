import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type SpinnerProps = {
    open: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ open }: SpinnerProps) => {
    return (
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Spinner;
