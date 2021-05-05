/* eslint-disable require-jsdoc */
import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";
import { connect } from "../../node_modules/pwa-helpers/connect-mixin.js";
import produce from "../../node_modules/immer/dist/immer.esm.js";
import { searchDatabase, saveRecipe } from "./scale-backend-actions.js";
import { store } from "../store.js";
export class RecipeSearch extends connect(store)(LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      state: Object
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`

<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
  vertical-align: bottom;
}

</style>

<div>
  <input
  type="text"
  id="r_search"
  style="width:25rem"
  @change="${e => store.dispatch(searchDatabase({
      "search": e.target.value
    }))}"
  >
  <button
  @click="${e => store.dispatch(searchDatabase({
      "search": this.shadowRoot.getElementById("r_search").value
    }))}"
  >search</button>
  <br><br>
  <div
  id="r_result"
  style="
    margin:auto;
    width:90%;
    max-height:500px;
    background: rgba(255, 255, 255, 0.25);
    overflow: scroll;
  "
  >
  ${this.state.searchResult.map((item, index) => {
      return html`
      <p>${item.name} <button 
                        @click="${e => store.dispatch(saveRecipe(item))}"
                        >Go</button></p>
    `;
    })}
  </div>
</div>

`;
  }

  stateChanged(state) {
    console.log('state changed', state);
    this.state = produce(state, newState => {
      newState = state;
    }).app;
  }

}
customElements.define('recipe-search', RecipeSearch);