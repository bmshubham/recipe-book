import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredients',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove All Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0){
              for (let i = len - 1; i >= 0; i--){
                fArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }],
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                
              })
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
          }
        }
      ]
    });
  }

  onSubmit() {
     console.log(this.recipeForm);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

}
