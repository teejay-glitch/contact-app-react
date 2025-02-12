import axios, { AxiosResponse } from "axios";
import { Contact } from "../models/Contact";

export class ContactService {
    public static async createContact(contact: Contact): Promise<AxiosResponse<boolean>> {
        const ep = "/contact/create";
        const res = await axios.post<boolean>(ep, contact);
        return res;
    }

    public static async updateContact(contact: Contact): Promise<AxiosResponse<boolean>> {
        const ep = "/contact/update";
        const res = await axios.put<boolean>(ep, contact);
        return res;
    }

    public static async getContactById(id: string): Promise<AxiosResponse<Contact>> {
        const ep = `/contact/${id}`;
        const res = await axios.get<Contact>(ep);
        return res;
    }

    public static async getAllContacts(): Promise<AxiosResponse<Contact[]>> {
        const ep = `/contact/getAll`;
        const res = await axios.get<Contact[]>(ep);
        return res;
    }

    public static async deleteContact(id: string): Promise<AxiosResponse<boolean>> {
        const ep = `/contact/${id}`;
        const res = await axios.delete<boolean>(ep);
        return res;
    }
}
