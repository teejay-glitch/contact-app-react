import axios, { AxiosResponse } from "axios";
import { Contact, CreateContact } from "../models/Contact";
import { BASE_URL } from "../helpers/constants";

export class ContactService {
    public static async createContact(contact: CreateContact): Promise<AxiosResponse<boolean>> {
        const ep = `${BASE_URL}/contact/create`;
        const res = await axios.post<boolean>(ep, contact);
        return res;
    }

    public static async updateContact(contact: Contact): Promise<AxiosResponse<boolean>> {
        const ep = `${BASE_URL}/contact/update`;
        const res = await axios.put<boolean>(ep, contact);
        return res;
    }

    public static async getContactById(id: string): Promise<AxiosResponse<Contact>> {
        const ep = `${BASE_URL}/contact/get-by-id/${id}`;
        const res = await axios.get<Contact>(ep);
        return res;
    }

    public static async getAllContacts(): Promise<AxiosResponse<Contact[]>> {
        const ep = `${BASE_URL}/contact/get-all`;
        const res = await axios.get<Contact[]>(ep);
        return res;
    }

    public static async deleteContact(id: string): Promise<AxiosResponse<boolean>> {
        const ep = `${BASE_URL}/contact/delete/${id}`;
        const res = await axios.delete<boolean>(ep);
        return res;
    }
}
