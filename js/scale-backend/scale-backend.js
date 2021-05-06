/* eslint-disable require-jsdoc */
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import produce from 'immer';
import { initApp, jsonUpdate, scaleTenWeight, searchDatabase } from './scale-backend-actions';
import { app } from './scale-backend-reducer';
import { store } from '../store.js';
import "./recipe-entryForm.js";
import "./recipe-display.js";
import "./recipe-search.js";
store.addReducers({ app });

export class ScaleBackend extends connect(store)(LitElement) {
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
    this.state = { tenWeight: 1 };
    store.dispatch(jsonUpdate(json));
    setInterval(() => { if (json.weight != this.state.json.weight) store.dispatch(jsonUpdate(json, this.state.tenWeight)) }, 1000);
  }

  render() {
    return html`
      <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"> -->
  <style>

    *,::after,::before {
    box-sizing: border-box
}

hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible
}

h1,h2,h3,h4,h5,h6 {
    margin-top: 0;
    margin-bottom: .5rem
}

p {
    margin-top: 0;
    margin-bottom: 1rem
}

label {
    display: inline-block;
    margin-bottom: .5rem
}

button {
    border-radius: 0
}
button,input,optgroup,select,textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit
}

button,input {
    overflow: visible
}

button,select {
    text-transform: none
}

[type=button],[type=reset],[type=submit],button {
    -webkit-appearance: button
}

[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled) {
    cursor: pointer
}

textarea {
    overflow: auto;
    resize: vertical
}

.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6 {
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2
}

.h2,h2 {
    font-size: 2rem
}

hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1)
}

.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}

textarea.form-control {
    height: auto
}




.grid{
  display:grid;
  grid-template-columns: 1fr 2fr;

}

  div{
    font-size: 1rem;
  }

  @media (max-width: 900px) {
.grid{
  grid-template-columns: 1fr;
}
}
  </style>
  <div
  style="
  margin:10px;
  "
  >
    <div class="grid">

      <div>
        <h2>Scale Browser App</h2>
        <hr>
        <p> Weight: ${this.state.json.weight}</p>
        <p> Temperature: ${this.state.json.temperature}</p>
        <p> Humidity: ${this.state.json.humidity}</p>
        <hr>
        <p>
        <button style="margin-left: 2rem;" @click="${(e) => websocket.send("tare")}">Tare</button>
        <br><br>
        <button style="margin-left: 2rem;" @click="${(e) => store.dispatch(scaleTenWeight(this.state.json.weight))}">Count</button>
        Weight: ${this.state.tenWeight} <span style="margin-left: 2rem">count: ${Math.ceil(this.state.count)}</span></p>
        <hr>
        <recipe-search></recipe-search>
      </div>


      <div>
        <recipe-display></recipe-display>
      </div>

  </div>
<hr>
<recipe-entryform></recipe-entryform>
  </div>
    `;
  }

  stateChanged(state) {
    console.log('state changed', state);
    this.state = produce(state, (newState) => {
      newState = state;
    }).app;
  }

}

customElements.define('scale-backend', ScaleBackend);
