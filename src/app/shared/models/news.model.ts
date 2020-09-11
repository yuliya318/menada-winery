import { INews } from '../interfaces/news.interface';

export class News implements INews {
    constructor(
        public id: string,
        public date: Date,
        public annotation: string,
        public title: string,
        public text: string,
        public image: string
    ) {}
}