export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthday?: string;
    orders?: Array<any>;
}