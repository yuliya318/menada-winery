import { IProduct } from './product.interface';

export interface IOrder {
    id: string;
    userName: string;
    userPhone: string;
    userCountry: string;
    userCity: string;
    userStreet: string;
    userHouse: string;
    products: Array<IProduct>;
    totalSum: number;
    date: Date;
    status: string;
    discount: number;
    comments?: string;
}