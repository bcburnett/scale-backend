import { LitElement, html } from '@polymer/lit-element/'
import { styles } from "./bcb-checkbox-style";

export class BcbCheckbox extends LitElement {
  static get properties() {
    return {
      checked:{
        type:String,
        attribute: true,
        reflect: true
      },
      name:String,
      label: String,
      value: {
        type: String,
        attribute: true,
        reflect: true
      }
    }
  }

  constructor() {
    super()


  }

  connectedCallback() {
    super.connectedCallback()
    const input = document.createElement('input')
    input.id = this.name
    input.name = this.name
    input.type = 'text'
    input.value=this.checked
    this.appendChild(input)
    this.value=this.checked
  }

  render() {
    return html`
      ${styles}

<input type="checkbox" id="cbx" ?checked=${this.checked==='true'} style="display: none;"  @change="${this.statechanged}">
<label for="cbx" class="check">
  <svg width="18px" height="18px" viewBox="0 0 18 18">
    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
    <polyline points="1 9 7 14 15 4"></polyline>
  </svg>&nbsp;<h3 style="display:inline-block">${this.label}</h3>
</label>
    `
  }

  statechanged(e) {
    this.value = this.shadowRoot.getElementById('cbx').checked===true?'true':'false'
    this.childNodes[0].value = this.value
    this.dispatchEvent(new CustomEvent("bcbcheck", { detail:{
      value: this.value,
      id:this.id
    }}));
  }

}

customElements.define('bcb-checkbox', BcbCheckbox)
