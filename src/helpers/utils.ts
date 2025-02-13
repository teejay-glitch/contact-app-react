export class Utils {
    public static isValidEmail(email: string): boolean {
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return reg.test(email);
    }

    public static isValidPhoneNumber(phone: string): boolean {
        const reg = /^\d{10}$/.test(phone);
        return reg;
    }
}
