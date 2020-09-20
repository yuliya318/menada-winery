import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone?: string,
        public birthday?: string,
        public orders?: Array<any>
    ) {}
}