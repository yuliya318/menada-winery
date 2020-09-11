import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/shared/interfaces/recipe.interface';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Array<IRecipe> = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  private getRecipes(): void {
    this.recipeService.getFirestoreRecipes().subscribe(
      collection => {
        this.recipes = collection.map(document => {
          const data = document.payload.doc.data() as IRecipe;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

}
