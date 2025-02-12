import React from "react";
import { Contact } from "../../models/Contact";
import { IconButton, Modal, Typography, Grid2, TextField, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ContactModalProps = {
    open: boolean;
    property: Contact;
    headerName: string;
    toggleModal: (data: Contact) => void;
    handleChange: (key: string, value: string) => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ open, property, headerName, toggleModal, handleChange }: ContactModalProps) => {
    return (
        <React.Fragment>
            <Modal open={open}>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "1.5rem",
                        maxWidth: "600px",
                        textAlign: "center",
                        backgroundColor: "white",
                    }}
                >
                    <Typography variant="h6" mb={3}>
                        {headerName}
                    </Typography>

                    <IconButton onClick={() => toggleModal(property)} sx={{ position: "absolute", top: "5px", right: "5px" }}>
                        <CloseIcon />
                    </IconButton>

                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <TextField
                                size="small"
                                fullWidth
                                label={"Name"}
                                value={property.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <TextField
                                size="small"
                                fullWidth
                                label={"Phone"}
                                value={property.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleChange("phone", e.target.value)
                                }
                            />
                        </Grid2>

                        <Grid2 size={12}>
                            <TextField
                                size="small"
                                fullWidth
                                label={"Email"}
                                value={property.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleChange("email", e.target.value)
                                }
                            />
                        </Grid2>
                    </Grid2>

                    <Box display={"flex"} mt={3} gap={"10px"} justifyContent={"center"}>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                        <Button variant="contained" color="error" onClick={() => toggleModal(property)}>
                            Close
                        </Button>
                    </Box>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default ContactModal;
