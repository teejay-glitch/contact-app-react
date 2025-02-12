import { useState, useEffect } from "react";
import { Contact } from "../models/Contact";
import { ContactService } from "../services/ContactService";

const useContacts = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([] as Contact[]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);

        try {
            const res = await ContactService.getAllContacts();

            if (res?.status === 200) {
                setContacts(res?.data);
            } else {
                throw new Error("Failed to fetch contacts");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        contacts,
        fetchContacts,
    };
};

export default useContacts;
