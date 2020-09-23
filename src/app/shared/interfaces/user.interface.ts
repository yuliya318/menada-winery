export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bDayConfirmed: boolean;
    phone?: string;
    birthday?: string;
    country?: string;
    city?: string;
    street?: string;
    house?: string;
}