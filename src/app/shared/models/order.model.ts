import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';


export class Order implements IOrder {
    constructor(public id: string,
                public userName: string,
                public userPhone: string,
                public userCountry: string,
                public userCity: string,
                public userStreet: string,
                public userHouse: string,
                public products: Array<IProduct>,
                public totalSum: number,
                public date: Date,
                public status: string = 'In processing',
                public discount: number = 0,
                public comments: string = '') { }
}

