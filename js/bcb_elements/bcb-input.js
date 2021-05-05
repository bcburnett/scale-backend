import {LitElement, html} from '@polymer/lit-element'

export class BcbInput extends LitElement {
  static get properties(){
    return {
      label: String,
      bg:{
        type: String,
        reflect: true
      },
      name:String,
      type:{
        type: String,
        attribute: true,
        reflect: true
      },
      width:Number,
      value:{
        type:String
      },
      max:Number,
      min:Number,
      left:String,
      title:String,
      value: {
        type: String,
        attribute: true,
        reflect: true
      }


    }
  }
  connectedCallback(){
    super.connectedCallback()
    const input = document.createElement('input')
    input.id = this.name
    input.name = this.name
    input.type = this.type
    input.value = this.value
    this.appendChild(input)
  }

   constructor(){
    super()
    this.bg = 'transparent'
    this.width = "75px"
    this.name = ''
    this.type = 'text'
    this.max = Number.MAX_VALUE
    this.min = Number.MIN_VALUE
  }

  render(){
    return html`
    <style>
:host {
  --form-width:${this.width};
  margin:0;
  padding:0;
  display:block;
  width: var(--form-width);
  height: 23px;
  margin-top:1rem;
  box-sizing: border-box;
  cursor: pointer;
  color:black;
  position:relative;
  font-family:inherit;
}

    .form-group {
  position: relative;
  font-size: 1rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align:center;
  margin: auto;
}

.form-control-placeholder {
  position: absolute;
  top: -3px;
  padding: 9px;
  opacity: 1;
  cursor:pointer;
  font-size: 10px;
  color:var(--calc-color);
  font-size: 200%;
  font-weight: bold;
  text-shadow:1px 1px black;
  font-family:var(--calc-font);
  left: ${this.left}%;
transform: translateX(-${this.left}%)
}

.form-control{
  position:absolute;
  top: 10px;
  left:0;
  border:0;
  border-bottom: 1px solid var(--input-color);
  background:${this.bg};
  outline: none;
  width: var(--form-width);
  color: var(--input-color);
  cursor:pointer;
  font-size:1.5rem;
  font-family:var(--input-font);
  text-align:right;
}


.form-control:focus + .form-control-placeholder,
.form-control:valid + .form-control-placeholder {
  transform: translate3d(0, -60%, 0);
  font-size: 100%;
  opacity: 1;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 10.8px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: var(--primary-light);
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 20px;
  width: 6px;
  border-radius: 3px;
  background: var(--primary-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -11px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--primary-light);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: var(--primary-light);
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 30px;
  width: 16px;
  border-radius: 3px;
  background: #c2ffff;
  cursor: pointer;
}
    </style>
      <div class="form-group">
        <input
         type="${this.type}"
         id="input"
         class="form-control"
         value=""
         max="${this.max}"
         min="${this.min}"
         @input="${this.inputChange}"
         @keyup="${this.inputChange}"
        title="${this.value}"
         required>
        <label class="form-control-placeholder" for="input">${this.label}</label>
      </div>

    `
  }

  inputChange(e){
    if(!e)return
    this.value = this.shadowRoot.getElementById('input').value
    this.childNodes[0].value = this.value
    this.title=this.value
    let key
    try{key = e.key}catch(e){key = ''}
      this.dispatchEvent(new CustomEvent("bcbinput", {
        detail: {
          value: this.value,
          key,
          elem: this
        }
      })
    );
  }

  updated(){
    this.shadowRoot.getElementById('input').value = this.value
    this.inputChange()
  }
}

customElements.define('bcb-input',BcbInput)
