import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
    constructor(
        public id: string,
        public catID: string,
        public catName: string,
        public name: string,
        public sort: string,
        public volume: string,
        public promille: string,
        public vintage: number,
        public oak: string,
        public color: string,
        public aroma: string,
        public taste: string,
        public temp: string,
        public price: number,
        public image: string,
        public count: number = 1
    ) {}
}