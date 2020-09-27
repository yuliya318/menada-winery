
export interface IInquiry {
    id: string;
    date: Date;
    name: string;
    phone: string;
    email: string;
    message: string;
    status: string;
    comments?: string;
}