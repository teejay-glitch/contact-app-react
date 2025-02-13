import React, { useMemo, useState } from "react";
import { Contact, CreateContact } from "../../models/Contact";
import CustomDatagrid from "../../components/CustomDatagrid";
import { Box, Button, Grid2, Paper, TextField, Typography } from "@mui/material";
import ContactModal from "../../components/ContactModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import SearchBar from "../../components/SearchBar";
import useContacts from "../../hooks/useContacts";
import { ContactService } from "../../services/ContactService";
import Spinner from "../../components/Layout/Spinner";
import { toast } from "react-toastify";
import { Utils } from "../../helpers/utils";

const initialState: Contact = {
    name: "",
    email: "",
    phone: "",
    id: "",
};

const ContactPage: React.FC = () => {
    const [property, setProperty] = useState<Contact>(initialState);
    const [contact, setContact] = useState<Contact>(initialState);
    const [searchKey, setSearchKey] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [editPhoneError, setEditPhoneError] = useState<boolean>(false);
    const [editEmailError, seteditEmailError] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeletModal, setShowDeletModal] = useState<boolean>(false);

    const { contacts, contactList, loading: dataLoading, setContacts, fetchContacts } = useContacts();

    const handleAddChange = (key: string, value: string) => {
        if (key === "phone") {
            const isValidPhone = Utils.isValidPhoneNumber(value);
            setPhoneError(!isValidPhone);
        } else if (key === "email") {
            const isValidEmail = Utils.isValidEmail(value);
            setEmailError(!isValidEmail);
        }

        setProperty({ ...property, [key]: value });
    };

    const handleEditChange = (key: string, value: string) => {
        if (key === "phone") {
            const isValidPhone = Utils.isValidPhoneNumber(value);
            setEditPhoneError(!isValidPhone);
        } else if (key === "email") {
            const isValidEmail = Utils.isValidEmail(value);
            seteditEmailError(!isValidEmail);
        }

        setContact({ ...contact, [key]: value });
    };

    const handleAdd = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data: CreateContact = {
                name: property.name,
                email: property.email,
                phone: property.phone,
            };
            const res = await ContactService.createContact(data);

            if (res?.status === 201) {
                fetchContacts();
            } else throw new Error("Failed to create contact");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
            setProperty(initialState);
        }
    };

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        toggleEdit(property);
        setLoading(true);

        try {
            const data: Contact = {
                id: contact?.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
            };
            const res = await ContactService.updateContact(data);

            if (res?.status === 200) {
                fetchContacts();
            } else throw new Error("Failed to update contact");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
            setProperty(initialState);
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.preventDefault();
        toggleDelete(property);
        setLoading(true);

        try {
            const res = await ContactService.deleteContact(id);

            if (res?.status === 200) {
                fetchContacts();
            } else throw new Error("Failed to delete contact");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
            setProperty(initialState);
        }
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
        setContacts(contactList);
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
            <Spinner open={loading || dataLoading} />

            <ContactModal
                open={showEditModal}
                property={contact}
                headerName={"Edit Contact"}
                emailError={editEmailError}
                phoneError={editPhoneError}
                toggleModal={toggleEdit}
                handleChange={handleEditChange}
                handleUpdate={handleUpdate}
            />

            <ConfirmationModal
                open={showDeletModal}
                property={contact}
                title={"Confirm delete"}
                content={"Are you sure you want to delete this contact?"}
                toggleModal={toggleDelete}
                handleDelete={handleDelete}
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
                                error={phoneError}
                                helperText={phoneError ? "Phone number must be 10 digits" : ""}
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
                                error={emailError}
                                helperText={emailError ? "Invalid email" : ""}
                            />
                        </Grid2>
                    </Grid2>

                    <Box display={"flex"} justifyContent={"flex-end"} mt={3}>
                        <Button
                            variant="contained"
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                handleAdd(e);
                            }}
                            disabled={phoneError || emailError}
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
