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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,700">
  <style>

.grid{
  display:grid;
  grid-template-columns: 1fr 2fr;
}

  div{
    font-size: 1rem;
  }
  </style>
  <div>
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
