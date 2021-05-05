import { LitElement, html } from '@polymer/lit-element/'
import "./bcb-input"
import { Styles } from "./bcb-calculator-style";

export class BcbCalculator extends LitElement {
  static get properties() {
    return {
      display: {
        type: String,
        attribute: true,
        reflect: true
      },
      btnArray: Array,
      tooltip: String
    }
  }

  connectedCallback() {
    this.display = ''
    this.btnArray = [
      '(', ')', '±', 'C',
      '^', '√', '^2', '^3',
      '7', '8', '9', '/',
      '4', '5', '6', 'X',
      '1', '2', '3', '-',
      '0', '.', '=', '+',]
  }

  afterFirstUpdate(){
    
  }

  render() {

    const makeButtons = () => {
      return this.btnArray.map(e => html`
          <button
          @click="${e => this.buttonClick(e.path[0].id.substring(3))}"
          id="btn${e}"
          >
          ${e}
        </button>
        `)
    }
    return html`
      ${Styles}

  <div class="container ${this.tooltip ? 'tooltip' : ''}"><span class="${this.tooltip ? '' : 'hidden'}"><i class="fas fa-calculator"></i> ${this.tooltip}</span>
      <p >
        <bcb-input
        left="0"
        name="username"
        value="${this.display}"
        id="bcb-input1"
        label="Calculator"
        width="100%"
        type="text"
        @bcbinput="${e => {
        if (e.detail.key === 'Enter') { this.evalDisplay() }
        else if (e.detail.key === 'Escape') { this.display = '' }
        else { this.display = e.detail.value }
      }}"
        />
      </p>
      <div class="keyboard">
        ${ makeButtons()}

      </div>

  </div>
    `
  }

  evalDisplay() {
    this.sanitizeDisplay()
    if (this.keypress === 1) this.display += this.lasteval
    this.lasteval = this.display.toString().replace(/^[\d.]*(?:e-\d+)?(?:e\+\d+)?\s*/, '')
    this.keypress = 0
    let x
    try { x = eval(this.display) } catch (e) { x = undefined }
    if (typeof (x) !== "number") x = undefined
    this.display = x || x === 0 ? eval(x.toFixed(10)).valueOf() : ''
    this.sendEvent()
    return
  }

  sanitizeDisplay(){
    this.display = this.display.toString()
    if (this.display.includes('this') ||
      this.display.includes('window') ||
      this.display.includes('document')) this.display = ''
  }

  buttonClick(e) {
    this.keypress++
    this.shadowRoot.querySelector('bcb-input').shadowRoot.querySelector('input').focus()
    switch (e) {

      case '=':
        this.evalDisplay()
        return

      case 'Enter':
        this.evalDisplay()
        return

      case 'C':
        this.display = ''
        this.sendEvent()
        return

      case 'Escape':
        this.display = ''
        this.sendEvent()
        return

      case '±':
        this.sanitizeDisplay()
        this.display = isNaN(-eval(this.display)) ? '' : -eval(this.display)
        this.sendEvent()
        return

      case '√':
        this.sanitizeDisplay()
        this.display = eval(Math.sqrt(Math.abs(eval(this.display))).toFixed(15)).valueOf()
        this.display = isNaN(this.display) ? '' : this.display
        this.sendEvent()
        return

      case '^2':
        this.sanitizeDisplay()
        this.display = eval(eval(Math.abs(eval(this.display)) + "**2").toFixed(13)).valueOf()
        this.display = isNaN(this.display) ? '' : this.display
        this.sendEvent()
        return

      case '^3':
        this.sanitizeDisplay()
        this.display = eval(eval(Math.abs(eval(this.display)) + "**3").toFixed(13)).valueOf()
        this.display = isNaN(this.display) ? '' : this.display
        this.sendEvent()
        return

      case 'Backspace':
        this.display = this.display.substring(0, this.display.length - 1)
        return

      case '+'://plus
        this.display += '+'
        return

      case '-'://minus
        this.display += '-'
        return

      case 'X'://multiply
        this.display += '*'
        return

      case '/'://divide
        this.display += '/'
        return

      case '^'://divide
        this.display += '**'
        return

      default:
        this.display += e
        return;
    }


  }

  sendEvent() {
    this.dispatchEvent(new CustomEvent("bcbcalculator", { detail: this.display }))
  }


}

customElements.define('bcb-calculator', BcbCalculator)
