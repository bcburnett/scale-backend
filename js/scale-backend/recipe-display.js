/* eslint-disable require-jsdoc */
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import produce from 'immer';

export class RecipeDisplay extends connect(store)(LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      state: Object,
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

  max-width: 90%;
  height: auto;
  vertical-align: bottom;
}

.recipe-card {
  background: rgba(255,255,255,0.25);
  margin: 4em auto;
  width: 90%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.recipe-card aside {
  position: relative;
  text-align:center;
  background: rgba(255,255,255,0.25)
}
.recipe-card aside img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height:150px;
  margin: 10px;
}
.recipe-card aside .button {
  background: #57abf2;
  display: inline-block;
  position: absolute;
  top: 80%;
  right: 3%;
  width: 4.0625em;
  height: 4.0625em;
  border-radius: 4.0625em;
  line-height: 4.0625em;
  text-align: center;
}
.recipe-card aside .button .icon {
  vertical-align: middle;
}
.recipe-card article {
  padding: 1.25em 1.5em;
}
.recipe-card article ul {
  list-style: none;
  margin: 0.5em 0 0;
  padding: 0;
}
.recipe-card article ul li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}
.recipe-card article ul li:first-child {
  margin-left: 0;
}
.recipe-card article ul li .icon {
  vertical-align: bottom;
}
.recipe-card article ul li span:nth-of-type(2) {
  margin-left: 0.5em;
  font-size: 0.8em;
  font-weight: 300;
  vertical-align: middle;
  color: #838689;
}
.recipe-card article h2, .recipe-card article h3 {
  margin: 0;
  font-weight: 300;
}
.recipe-card article h2 {
  font-size: 1.75em;
  color: #222222;
}
.recipe-card article h3 {
  font-size: 0.9375em;
  color: #838689;
}
.recipe-card article p {
  margin: 1.25em 0;
  font-size: 0.8125em;
  font-weight: 400;
  color: #222222;
}
.recipe-card article p span {
  font-weight: 700;
  color: #000000;
}
.recipe-card article .ingredients {
  margin: 2em 0 0.5em;
}
.recipe-card .icon {
  display: inline;
  display: inline-block;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/recipe-card-icons.svg);
  background-repeat: no-repeat;
}
.recipe-card .icon-calories, .recipe-card .icon-calories\:regular {
  background-position: 0 0;
  width: 16px;
  height: 19px;
}
.recipe-card .icon-clock, .recipe-card .icon-clock\:regular {
  background-position: 0 -19px;
  width: 20px;
  height: 20px;
}
.recipe-card .icon-level, .recipe-card .icon-level\:regular {
  background-position: 0 -39px;
  width: 16px;
  height: 19px;
}
.recipe-card .icon-play, .recipe-card .icon-play\:regular {
  background-position: 0 -58px;
  width: 21px;
  height: 26px;
}
.recipe-card .icon-users, .recipe-card .icon-users\:regular {
  background-position: 0 -84px;
  width: 18px;
  height: 18px;
}
pre{
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  max-width:700px;
  max-height:300px;
  font-size: 0.75rem;
}
  </style>

<div class="recipe-card">

	<aside>

		<img src="${this.state.recipe.website || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="}" alt="Chai Oatmeal" />

	</aside>

	<article>

		<h2>${this.state.recipe.name}</h2>
		<h3>${this.state.recipe.cuisine} ${this.state.recipe.type}</h3>

		<ul>
			<li><span>Servings</span><span>${this.state.recipe.servings}</span></li>
			<li><span>Prep/Cook Time</span><span>${this.state.recipe.ptime} ${this.state.recipe.ctime}</span></li>
		</ul>
<p>Description: <pre>${this.state.recipe.description}</pre></p>

  <p>Ingredients:</p>
        <p>
        ${this.state.recipe.ingredients.map((value, index) => {
          return html`${value[0]} ${value[1]} ${value[2]}<br>`
        })
      }

      </p>
  <p>Instructions: <pre>${this.state.recipe.instructions}</pre></p>
  <p>Website: <a href="${this.state.recipe.source}" target="_blank">Website</a></p>
		

	</article>

</div>`;
  }

  stateChanged(state) {
    console.log('state changed', state);
    this.state = produce(state, (newState) => {
      newState = state;
    }).app;
  }

}

customElements.define('recipe-display', RecipeDisplay);
