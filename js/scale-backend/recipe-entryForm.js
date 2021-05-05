/* eslint-disable require-jsdoc */
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import produce from 'immer';
import { saveRecipe, addToDatabase, updateDatabase } from './scale-backend-actions';
import { store } from '../store.js';
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
    this.recipe = {
      name: '',
      description: '',
      cuisine: '',
      type: '',
      priingredient: '',
      ingredients: [],
      instructions: '',
      ptime: '',
      ctime: '',
      servings: '',
      source: '',
      website: '',
      _id: '',
    };
    this.submit();
  }

  firstUpdated(changedProperties) {
    this.submit();
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
  grid-template-columns: 1fr 1fr 1fr;
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
<div class="grid">

<!-- //grid collumn 1 -->
<div> 
  <div class="form-floating">
   <label for="r_name">Recipe Name</label>
    <input type="text"  
    class="form-control" 
    id="r_name" 
    value="${this.state.recipe.name}"
    @change="${e => {
        this.recipe = { ...this.recipe, name: e.target.value };
        this.submit()
      }}">
  </div>
  
  <div>
    <label for="r_description">Description</label>
    <textarea  
    class="form-control" 
    id="r_description"
    @change="${e => {
        this.recipe = { ...this.recipe, description: e.target.value };
        this.submit()
      }}"></textarea>
  </div>
  
  <div  class="form-floating">
    <label for="r_cuisine">Cuisine</label>
    <select 
    id="r_cuisine"  
    class="form-control" 
    @change="${e => {
        this.recipe = { ...this.recipe, cuisine: e.target.value };
        this.submit()
      }}">
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
    <select 
    id="r_type"  
    class="form-control" 
        @change="${e => {
        this.recipe = { ...this.recipe, type: e.target.value };
        this.submit()
      }}">
      <option value="Choose">Choose</option>
      <option value="Appetizer">Appetizer</option>
      <option value="Beverage">Beverage</option>
      <option value="Bread">Bread</option>
      <option value="Dessert">Dessert</option>
      <option value="Main">Main</option>
      <option value="Salad">Salad</option>
      <option value="Soup">Soup</option>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
      <option value="Vegetable">Vegetable</option>
      <option value="Beef">Beef</option>
      <option value="Pork">Pork</option>
      <option value="Chicken">Chicken</option>
      <option value="Fish">Fish</option>
      <option value="Meat">Meat</option>
      
    </select>
  </div>
  
  <div  class="form-floating">
    <label for="r_priingredient">Primary ingredient</label>
    <input 
    type="text" 
    id="r_priingredient"  
    class="form-control" 
    value="${this.state.recipe.priingredient}"
        @change="${e => {
        this.recipe = { ...this.recipe, priingredient: e.target.value };
        this.submit()
      }}">
  </div>

    <div class="form-floating">
    <label for="r_source">Website</label>
    <input
    type="text"
    id="r_source"
    class="form-control"
    value="${this.state.recipe.source}"
        @change="${e => {
        this.recipe = { ...this.recipe, source: e.target.value };
        this.submit()
      }}">
  </div>

  <div class="form-floating">
    <label for="r_website" >Image</label>
    <input 
    type="text" 
    id="r_website"  
    class="form-control"
    value="${this.state.recipe.website}"
        @change="${e => {
        this.recipe = { ...this.recipe, website: e.target.value };
        this.submit()
      }}">
  </div>

</div>

<div>
  
  <div class="form-floating">
    <label>Ingredients</label>
    <br>
    <div>
      <p>
        ${this.ingredients.map((value, index) => {
        return html`${value[0]} 
        ${value[1]} 
        ${value[2]} 
        <button 
        data-index="${index}" 
        @click="${(e) => this.deleteIng(e.target.dataset.index)}"
        >&#9249;</button>
        <button
        data-index="${index}" 
        @click="${(e) => this.swapIng(e.target.dataset.index, e.target.dataset.index - 1)}"
        >⬆</button>
        <button
        data-index="${index}" 
        @click="${(e) => this.swapIng(e.target.dataset.index, Number(e.target.dataset.index) + 1)}"
        >⬇</button>
        <br>`
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
    <textarea 
    id="r_instructions"  
    class="form-control"
    style="height: 300px;"
    value="${this.state.recipe.instructions}"
        @change="${e => {
        this.recipe = { ...this.recipe, instructions: e.target.value };
        this.submit()
      }}"></textarea>
  </div>

</div>  
<div>
  <div  class="form-floating">
    <label for="r_ptime">Prep time</label>
    <input 
    type="text" 
    id="r_ptime"  
    class="form-control"
    value="${this.state.recipe.ptime}"
        @change="${e => {
        this.recipe = { ...this.recipe, ptime: e.target.value };
        this.submit()
      }}">
  </div>
  
  <div class="form-floating">
    <label for="r_ctime">Cook time</label>
    <input 
    type="text" 
    id="r_ctime"  
    class="form-control" 
    value="${this.state.recipe.ctime}"
        @change="${e => {
        this.recipe = { ...this.recipe, ctime: e.target.value };
        this.submit()
      }}">
  </div>
  
  <div class="form-floating">
    <label for="r_servings">Number of servings</label>
    <input 
    type="text" 
    id="r_servings"  
    class="form-control"
    value="${this.state.recipe.servings}"
        @change="${e => {
        this.recipe = { ...this.recipe, servings: e.target.value };
        this.submit()
      }}">
  </div>
  


  <div class="form-floating">
    <label for="r_id" >id</label>
    <input 
    type="text" 
    id="r_id"
    value="${this.state.recipe._id}"
    class="form-control" 
        @change="${e => {
        this.recipe = { ...this.recipe, _id: e.target.value };
        this.submit()
      }}">
  </div>
  
  <div>
    <button @click="${e => store.dispatch(addToDatabase(this.state.recipe))}">Add</button>
    <button @click="${e => this.modifyDatabase()}">Update</button>
    <button @click="${e => store.dispatch(saveRecipe({
      name: '',
      description: '',
      cuisine: '',
      type: '',
      priingredient: '',
      ingredients: [],
      instructions: '',
      ptime: '',
      ctime: '',
      servings: '',
      source: '',
      website: '',
      _id: '',
    }))}">Clear</button>

  </div>
</div>

</div>

<div style="
height: 100px;
"></div>
    `;
  }

  submit() {
    store.dispatch(saveRecipe(this.recipe));
  }

  modifyDatabase(){
    store.dispatch(updateDatabase(this.state.recipe))
  }

  swapIng(x, y) {
    if (y < 0 || y > this.ingredients.length - 1) return;
    [this.ingredients[x], this.ingredients[y]] = [this.ingredients[y], this.ingredients[x]];
    this.recipe = { ...this.recipe, ingredients: [...this.ingredients] };
    this.submit();
  }

  addIngredient() {
    this.shadowRoot.getElementById("qty").value = "";
    this.shadowRoot.getElementById("unit").value = "";
    this.shadowRoot.getElementById("ingredient").value = "";
    this.shadowRoot.getElementById("qty").focus();
    this.ingredients = [...this.ingredients, [this.qty, this.unit, this.ing] ];
    this.recipe = { ...this.recipe, ingredients: [...this.ingredients] };
    this.submit();
  }

  deleteIng(index) {
    this.ingredients.splice(index, 1);
    this.ingredients = [...this.ingredients];
    this.recipe = { ...this.recipe, ingredients: [...this.ingredients] };
    this.submit();
  }



  stateChanged(state) {
    console.log('state changed', state);
    this.state = produce(state, (newState) => {
      newState = state;
    }).app;
    this.recipe = this.state.recipe;
    this.ingredients = [...this.state.recipe.ingredients];
    this.shadowRoot.getElementById('r_description').value = this.state.recipe.description;
    this.shadowRoot.getElementById('r_instructions').value = this.state.recipe.instructions;
  }

  // updated(changedProperties) {
  //   console.log(changedProperties);
  // }
}

customElements.define('recipe-entryform', RecipeEntryForm);
