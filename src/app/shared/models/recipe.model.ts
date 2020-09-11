import { IRecipe } from '../interfaces/recipe.interface';

export class Recipe implements IRecipe {
    constructor(
        public id: string,
        public title: string,
        public ingredients: string,
        public recipe: string,
        public cocktails: number,
        public image: string
    ) {}
}