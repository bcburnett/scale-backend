import {LitElement, html} from '@polymer/lit-element/lit-element.js'
export class BcbClock extends LitElement {
  static get properties(){return {arry: Array,clock: String}}
  constructor(){super()
    let timer = setInterval(()=>{
      this.clock= new Date().toString().substring(15,25)
      this.dispatchEvent( new CustomEvent("bcbclock", {detail: {name: "clock",value: this.clock}}))
    }, 1000)}
  render(){return html`${this.clock}`}}
customElements.define('bcb-clock',BcbClock)
