/* eslint-disable require-jsdoc */
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import produce from 'immer';
import { initApp, jsonUpdate, scaleTenWeight } from './scale-backend-actions';
import { app } from './scale-backend-reducer';
import { store } from '../store.js';
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
    this.state={tenWeight : 1};
    store.dispatch(initApp());
      store.dispatch(jsonUpdate(json)); 
      setInterval(()=> {if(json.weight != this.state.json.weight)store.dispatch(jsonUpdate(json, this.state.tenWeight)) }, 1000);
  }

  render() {
    return html`
  <style>

  div{
    text-align: center;
    font-size: 1.5rem;
  }
  </style>
  <div>
    <h1>${this.state.myapp}</h1>
    <p> Weight: ${this.state.json.weight}</p>
    <p> Temperature: ${this.state.json.temperature}</p>
    <p> Humidity: ${this.state.json.humidity}</p>
    <p>
      <button @click="${(e) => websocket.send("tare")}">Tare</button>
      </p>
      <p>
      <button @click="${(e) => store.dispatch(scaleTenWeight(this.state.json.weight))}">10 Weight</button>
    </p>
    <p> 10 weight: ${this.state.tenWeight}</p>
<p> count: ${Math.ceil(this.state.count)}</p>
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
