import { IInquiry } from '../interfaces/inquiry.interface';

export class Inquiry implements IInquiry {
    constructor(
        public id: string,
        public date: Date,
        public name: string,
        public phone: string,
        public email: string,
        public message: string,
        public status: string = "In processing",
        public comments?: string,
    ) {}
}