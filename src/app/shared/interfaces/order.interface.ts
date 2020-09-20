import { IProduct } from './product.interface';

export interface IOrder {
    id: string;
    userName: string;
    userPhone: string;
    userCity: string;
    userStreet: string;
    userHouse: string;
    products: Array<IProduct>;
    totalSum: number;
    date: Date;
    status: string;
    comments?: string;
}