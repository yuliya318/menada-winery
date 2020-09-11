import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IRecipe } from '../../shared/interfaces/recipe.interface';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.component.html',
  styleUrls: ['./admin-recipes.component.scss']
})
export class AdminRecipesComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  editStatus = false;
  imageStatus = false;
  deleteRecipeID: string;

  adminRecipes: Array<IRecipe> = [];
  recipeID = '1';
  recipeTitle: string;
  recipeIngreds: string;
  recipeText: string;
  recipeCocktails: number;
  recipeImage: string;

  constructor(private modalService: BsModalService,
    private afStorage: AngularFireStorage,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }


  private getRecipes(): void {
    this.recipeService.getFirestoreRecipes().subscribe(
      collection => {
        this.adminRecipes = collection.map(document => {
          const data = document.payload.doc.data() as IRecipe;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `recipe-img/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`recipe-img/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.recipeImage = url;
        this.imageStatus = true;
      });
    });
  }

  deleteImage(): void {
    this.recipeImage = '';
    this.imageStatus = false;
  }

  createRecipe(): IRecipe {
    const newRecipe = new Recipe (
      this.recipeID,
      this.recipeTitle,
      this.recipeIngreds.toLowerCase(),
      this.recipeText,
      this.recipeCocktails,
      this.recipeImage
    );
    return newRecipe;
  }

  addRecipe(): void {
    const newRecipe = this.createRecipe();
    delete newRecipe.id;
    this.recipeService.postFirestoreRecipe({ ...newRecipe })
      .then(() => this.getRecipes())
    this.resetForm();
  }

  editRecipe(): void {
    let newRecipe = this.createRecipe();
    this.recipeService.updateFirestoreRecipe({ ...newRecipe })
      .then(() => this.getRecipes());
    this.resetForm();
  }

  changeEditStatus(recipe: IRecipe): void {
    this.editStatus = true;
    this.recipeID = recipe.id;
    this.recipeTitle = recipe.title;
    this.recipeIngreds = recipe.ingredients;
    this.recipeText = recipe.recipe;
    this.recipeCocktails = recipe.cocktails;
    this.recipeImage = recipe.image;
    this.imageStatus = true;
  }

  deleteRecipe(): void {
    this.recipeService.deleteFirestoreRecipe(this.deleteRecipeID)
      .then(() => {
        this.getRecipes();
        this.deleteRecipeID = '';
      })
  }

  private resetForm(): void {
    this.recipeID = '1';
    this.recipeTitle = '';
    this.recipeIngreds = '';
    this.recipeText = '';
    this.recipeCocktails = 0;
    this.recipeImage = '';
    this.imageStatus = false;
    this.editStatus = false;
  }

}