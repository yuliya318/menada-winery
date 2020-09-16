import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { IRecipe } from '../../shared/interfaces/recipe.interface';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: IRecipe;
  recipeIngreds: Array<string> = [];
  recipes: Array<IRecipe> = [];


  constructor(private recipeService: RecipeService,
    private firestore: AngularFirestore,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        debugger
        const recipeTitle = this.actRoute.snapshot.paramMap.get('name');
        this.getRecipeDetails(recipeTitle);
      }
    });
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipeDetails(recipeTitle: string): void {
    this.firestore.collection('recipes').ref.where('title', '==', recipeTitle).onSnapshot(
      snap => {
        snap.forEach(document => {
          const data = document.data() as IRecipe;
          const id = document.id;
          this.recipe = ({ id, ...data });
          this.recipeIngreds = data.ingredients.split('*/');
        });
      }
    );
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

  getIndex(recipe: boolean): number {
    debugger
    const index = this.recipes.indexOf(this.recipes.filter(elem => elem.title === this.recipe.title)[0]);
    if (recipe) {
      if (index === 0) {
        return this.recipes.length - 1
      }
      return (index - 1);
    }
    else {
      if (index === (this.recipes.length - 1)) {
        return 0;
      }
      return (index + 1)
    }
  }

}
