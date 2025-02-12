import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { Contact } from "../../models/Contact";

type ConfirmationModalProps = {
    property: Contact;
    open: boolean;
    title: string;
    content: string;
    toggleModal: (data: Contact) => void;
    handleDelete: (id: string) => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    property,
    open,
    title,
    content,
    toggleModal,
    handleDelete,
}: ConfirmationModalProps) => {
    return (
        <React.Fragment>
            <Dialog open={open} onClose={() => toggleModal(property)}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Box display={"flex"} mt={3} gap={"10px"} justifyContent={"center"}>
                        <Button variant="contained" color="primary" onClick={() => handleDelete(property.id || "1")}>
                            Delete
                        </Button>
                        <Button variant="contained" color="error" onClick={() => toggleModal(property)}>
                            Close
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ConfirmationModal;
