/* eslint-disable require-jsdoc */
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import produce from 'immer';
import { initApp, saveRecipe } from './recipe-entryForm-actions';
import { refapp } from './recipe-entryForm-reducer';
import { store } from '../store.js';
store.addReducers({ refapp });

export class RecipeEntryForm extends connect(store)(LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      myapp: String,
      state: Object,
      recipe: Object,
      qty: String,
      unit: String,
      ing: String,
      ingredients: Array,
    };
  }

  constructor() {
    super();
    this.ingredients = [];
    this.recipe = {};
  }


  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <style>

textarea{
  height:15%;
}
div{
  padding: 15px;
}

.grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
}
pre{
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  max-width:300px;
}

@media (max-width: 300px) {
.grid{
  grid-template-columns: 1fr;
}
}
      </style>
  <h2>Recipe Entry Form</h2>
  <hr>
  <div class="grid">

<div style="margin-left:10px">
  <h2>${this.recipe.name}</h2>
  <p>Description: <pre>${this.recipe.description}</pre></p>
  <p>Cuisine: ${this.recipe.cuisine}</p>
  <p>Type: ${this.recipe.type}</p>
  <p>Primary Ingredient: ${this.recipe.priingredient}</p>
  <p>Ingredients:</p>
        <p>
        ${this.recipe.ingredients.map((value, index) => {
      return html`${value[0]} ${value[1]} ${value[2]}<br>`
    })
      }

      </p>
  <p>Instructions: <pre>${this.recipe.instructions}</pre></p>
  <p>Prep Time: ${this.recipe.ptime}</p>
  <p>Cook Time: ${this.recipe.ctime}</p>
  <p>Servings: ${this.recipe.servings}</p>
  <p>Source: ${this.recipe.source}</p>
  <p>Website: ${this.recipe.website}</p>
  <hr>
    <div>
        <pre>
${JSON.stringify(this.state.recipe, undefined, 1)}
        </pre>
  </div>
  </div>

  <div>
  <div class="form-floating">
   <label for="r_name">Recipe Name</label>
    <input type="text"  class="form-control" id="r_name" @change="${e => this.recipe = { ...this.recipe, name: e.target.value }}">
  </div>
  
  <div>
    <label for="r_description">Description</label>
    <textarea  class="form-control" id="r_description"  @change="${e => this.recipe = { ...this.recipe, description: e.target.value }}"></textarea>
  </div>
  
  <div  class="form-floating">
    <label for="r_cuisine">Cuisine</label>
    <select id="r_cuisine"  class="form-control" @change="${e => this.recipe = { ...this.recipe, cuisine: e.target.value }}">
      <option value="Choose">Choose</option>
      <option value="African">African</option>
      <option value="American">American</option>
      <option value="Asian">Asian</option>
      <option value="Caribbean">Caribbean</option>
      <option value="Chinese">Chinese</option>
      <option value="French">French</option>
      <option value="Greek">Greek</option>
      <option value="Indian">Indian</option>
      <option value="Italian">Italian</option>
      <option value="Japanese">Japanese</option>
      <option value="Mexican">Mexican</option>
      <option value="Middle Eastern">Middle Eastern</option>
      <option value="Moroccan">Moroccan</option>
      <option value="Spanish">Spanish</option>
      <option value="Thai">Thai</option>
      <option value="Other">Other</option>
    </select>
  </div>
  
  <div  class="form-floating">
    <label for="r_type">Dish type</label>
    <select id="r_type"  class="form-control" @change="${e => this.recipe = { ...this.recipe, type: e.target.value }}">
      <option value="Choose">Choose</option>
      <option value="Appetizer">Appetizer</option>
      <option value="Beverage">Beverage</option>
      <option value="Bread">Bread</option>
      <option value="Dessert">Dessert</option>
      <option value="Main">Main</option>
      <option value="Salad">Salad</option>
      <option value="Soup">Soup</option>
      <option value="Side dish">Side dish</option>
    </select>
  </div>
  
  <div  class="form-floating">
    <label for="r_priingredient">Primary ingredient</label>
    <input type="text" id="r_priingredient"  class="form-control" @change="${e => this.recipe = { ...this.recipe, priingredient: e.target.value }}">
  </div>
  
  <div class="form-floating">
    <label>Ingredients</label>
    <br>
    <div>
      <p>
        ${this.ingredients.map((value, index) => {
        return html`${value[0]} ${value[1]} ${value[2]} <button data-index="${index}" @click="${(e) => this.deleteIng(e.target.dataset.index)}">Del</button><br>`
      })
      }

      </p>
    </div>
      <input type="text" style="width:3rem;" placeholder="qty" id="qty"    @change="${e => this.qty = e.target.value}">
      <input type="text" style="width:4rem;" placeholder="unit"  id="unit"   @change="${e => this.unit = e.target.value}">
      <input type="text" style="width:12rem;" placeholder="ingredient" id="ingredient"   @change="${e => this.ing = e.target.value}">
      <button style="width:6rem;" @click="${e => this.addIngredient()}">Add</button>
      </div>

  
  <div class="form-floating">
    <label for="r_instructions">Instructions</label>
    <textarea id="r_instructions"  class="form-control" @change="${e => this.recipe = { ...this.recipe, instructions: e.target.value }}"></textarea>
  </div>
  
  <div  class="form-floating">
    <label for="r_ptime">Prep time</label>
    <input type="text" id="r_ptime"  class="form-control" @change="${e => this.recipe = { ...this.recipe, ptime: e.target.value }}">
  </div>
  
  <div class="form-floating">
    <label for="r_ctime">Cook time</label>
    <input type="text" id="r_ctime"  class="form-control" @change="${e => this.recipe = { ...this.recipe, ctime: e.target.value }}">
  </div>
  
  <div class="form-floating">
    <label for="r_servings">Number of servings</label>
    <input type="text" id="r_servings"  class="form-control" @change="${e => this.recipe = { ...this.recipe, servings: e.target.value }}">
  </div>
  
  <div class="form-floating">
    <label for="r_source">Source</label>
    <input type="text" id="r_source"  class="form-control" @change="${e => this.recipe = { ...this.recipe, source: e.target.value }}">
  </div>

  <div class="form-floating">
    <label for="r_website" >Website</label>
    <input type="text" id="r_website"  class="form-control" @change="${e => this.recipe = { ...this.recipe, website: e.target.value }}">
  </div>

  <div class="form-floating">
    <label for="r_id" >id</label>
    <input type="text" id="r_id"  class="form-control" @change="${e => this.recipe = { ...this.recipe, _id: e.target.value }}" >
  </div>
  
  <div>
    <button @click="${e => this.submit()}">Save</button>
    <button @click="${e => this.addRecipe()}">Add</button>
    <button @click="${e => this.updateRecipe()}">Update</button>
  </div>
  </div>
  </div>

<div style="
height: 100px;
"></div>
    `;
  }

  submit() {
    console.log(this.recipe);
    store.dispatch(saveRecipe(this.recipe));

  }

  addRecipe() {
    fetch('http://192.168.1.177:2020/recipe', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.recipe)
    }).then(res => res.json())
      .then(res => {
        store.dispatch(saveRecipe(res))
        this.shadowRoot.getElementById('r_id').value = res._id;
      });
  }

  updateRecipe() {
    Object.defineProperty(this.recipe,
      '_id', { value: this.shadowRoot.getElementById("r_id").value }
    );

    console.log(this.recipe);

    fetch('http://192.168.1.177:2020/update', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.recipe)
    }).then(res => res.json())
      .then(res => store.dispatch(saveRecipe(this.recipe)));
  }

  addIngredient() {
    this.shadowRoot.getElementById("qty").value = "";
    this.shadowRoot.getElementById("unit").value = "";
    this.shadowRoot.getElementById("ingredient").value = "";
    this.shadowRoot.getElementById("qty").focus();
    this.ingredients.push([this.qty, this.unit, this.ing])
    console.log(this.ingredients);
    console.log(this.recipe);
    this.recipe = { ...this.recipe, ingredients: [...this.ingredients] };
    console.log(this.recipe);
    this.submit();
  }

  deleteIng(index) {
    console.log(index);
    console.log(this.ingredients);
    this.ingredients.splice(index, 1);
    this.ingredients = [...this.ingredients];
    console.log(this.ingredients);
    this.recipe = { ...this.recipe, ingredients: [...this.ingredients] };
    console.log(this.recipe);
    this.submit();
  }

  stateChanged(state) {
    console.log('state changed', state);
    this.state = produce(state, (newState) => {
      newState = state;
    }).app;
    this.recipe=this.state.recipe;
  }

  // updated(changedProperties) {
  //   console.log(changedProperties);
  // }
}

customElements.define('recipe-entryform', RecipeEntryForm);
