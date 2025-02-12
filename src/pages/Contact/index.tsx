import React, { useMemo, useState } from "react";
import { Contact } from "../../models/Contact";
import CustomDatagrid from "../../components/CustomDatagrid";
import { Box, Button, Grid2, Paper, TextField, Typography } from "@mui/material";
import ContactModal from "../../components/ContactModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import SearchBar from "../../components/SearchBar";

const initialState: Contact = { name: "", email: "", phone: "" };

const ContactPage: React.FC = () => {
    const [property, setProperty] = useState<Contact>(initialState);
    const [contact, setContact] = useState<Contact>(initialState);
    const [contacts, setContacts] = useState<Contact[]>([] as Contact[]);
    const [searchKey, setSearchKey] = useState<string>("");
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeletModal, setShowDeletModal] = useState<boolean>(false);

    const handleAddChange = (key: string, value: string) => {
        setProperty({ ...property, [key]: value });
    };

    const handleEditChange = (key: string, value: string) => {
        setContact({ ...contact, [key]: value });
    };

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setContacts([...contacts, property]);
        setProperty(initialState);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = e.target.value;
        setSearchKey(key);

        const trimmed = key.trim();
        const filteredContacts = contacts.filter((c) => {
            return (
                c.email.toLocaleLowerCase().includes(trimmed.toLocaleLowerCase()) ||
                c.name.toLocaleLowerCase().includes(trimmed.toLocaleLowerCase())
            );
        });

        setContacts(filteredContacts);
    };

    const clearSearch = () => {
        setSearchKey("");
        setContacts(contacts);
    };

    const toggleEdit = (data: Contact) => {
        if (!showEditModal) setContact(data);
        else setContact(initialState);
        setShowEditModal(!showEditModal);
    };

    const toggleDelete = (data: Contact) => {
        if (!showDeletModal) setContact(data);
        else setContact(initialState);
        setShowDeletModal(!showDeletModal);
    };

    const columns = useMemo(
        () => [
            {
                field: "name",
                headerName: "Name",
                minWidth: 125,
                flex: 1,
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 125,
                flex: 1,
            },
            {
                field: "phone",
                headerName: "Phone",
                minWidth: 125,
                flex: 1,
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <ContactModal
                open={showEditModal}
                property={contact}
                headerName={"Edit Contact"}
                toggleModal={toggleEdit}
                handleChange={handleEditChange}
            />

            <ConfirmationModal
                open={showDeletModal}
                property={contact}
                title={"Confirm delete"}
                content={"Are you sure you want to delete this contact?"}
                toggleModal={toggleDelete}
                handleDelete={() => {}}
            />

            <Paper elevation={2}>
                <Box padding={2} mb={3}>
                    <Typography variant="h6" mb={2}>
                        {" "}
                        Add Contact
                    </Typography>

                    <Grid2 container spacing={2}>
                        <Grid2 size={4}>
                            <TextField
                                size="small"
                                fullWidth
                                label={"Name"}
                                value={property.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleAddChange("name", e.target.value)
                                }
                            />
                        </Grid2>

                        <Grid2 size={4}>
                            <TextField
                                size="small"
                                fullWidth
                                label={"Phone"}
                                value={property.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleAddChange("phone", e.target.value)
                                }
                            />
                        </Grid2>

                        <Grid2 size={4}>
                            <TextField
                                size="small"
                                fullWidth
                                label={"Email"}
                                value={property.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    handleAddChange("email", e.target.value)
                                }
                            />
                        </Grid2>
                    </Grid2>

                    <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
                        <Button
                            variant="contained"
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                handleAdd(e);
                            }}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <SearchBar searchKey={searchKey} placeholder={"Search by Name or Email"} onChange={handleSearch} clearSearch={clearSearch} />

            <CustomDatagrid columns={columns} rows={contacts} toggleEdit={toggleEdit} toggleDelete={toggleDelete} />
        </React.Fragment>
    );
};

export default ContactPage;
