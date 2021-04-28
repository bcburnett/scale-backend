/* eslint-disable require-jsdoc */
import {LitElement, html, css} from 'lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import produce from 'immer';
import {initApp} from './scale-backend-actions';
import {app} from './scale-backend-reducer';
import {store} from '../store.js';
store.addReducers({app});

export class ScaleBackend extends connect(store)( LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      state: Object,
    };
  }

  //   /**
  //    * lit-element styles array. external style sheets can be added here.
  //    */
  //   static get styles() {
  //     return [css`

  // `];
  //   }

  /**
 * called when the component is created but before it is attached to the dom
 */
  constructor() {
    super();
    store.dispatch(initApp());
  }

  // /**
  //  * called after the first render, the shadow-dom is attached now.
  //  */
  // firstUpdated(changedProperties){
  //   console.log('first updated', changedProperties)
  // }

  // /**
  //  *  Invoked when a component is added to the document’s DOM.
  //  */
  // connectedCallback() {
  //   super.connectedCallback()

  //   console.log('connected')
  // }

  // /**
  //  *  Invoked when a component is removed from the document’s DOM.
  //  */
  // disconnectedCallback() {
  //   super.disconnectedCallback()

  //   console.log('disconnected')
  // }

  // attributeChangedCallback(name, oldValue, newValue){
  //   super.attributeChangedCallback();
  //   console.log('attribute changed', e)
  // }

  render() {
    return html`
  <h1>${this.state.myapp}</h1>
    `;
  }

  stateChanged(state) {
    console.log('state changed', state);
    this.state = produce(state, (newState)=>{
      newState=state;
    }).app;
  }

  // updated(changedProperties) {
  //   console.log(changedProperties);
  // }
}

customElements.define('scale-backend', ScaleBackend);
