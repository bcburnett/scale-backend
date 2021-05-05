export function setContent(){
// About
document.querySelector('#slot1').innerHTML =/*html*/`
<h1 align="center" style="margin-bottom: 0in; line-height: 100%"><font color="#ce181e">BCB
Web Components</font></h1>
<br>
<p align="left" style="margin-bottom: 0in; line-height: 100%">You can download the site by clicking the Dnld tab (2.1mb)</p>
<p align="left" style="margin-bottom: 0in; line-height: 100%">The
web components used on this page are:</p>
<p align="left" style="margin-bottom: 0in; line-height: 100%"><br/>
</p>
<ul>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-navbar</p>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-calculator</p>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-todo</p>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-content</p>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-tabs</p>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-input
	- used in calculator and todo</p>
	<li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-checkbox
  - used in todo</p>
  <li/>
<p align="left" style="margin-bottom: 0in; line-height: 100%">bcb-clock - used to update in the navbar display</p>
</ul>
<p align="left" style="margin-bottom: 0in; line-height: 100%"><br/>

</p>
<p align="left" style="margin-bottom: 0in; line-height: 100%">Every
thing on this page, with the exception of the control panel, is a web
component.</p>
<p align="left" style="margin-bottom: 0in; line-height: 100%">The individual components are detailed in their own tabs</p>
<br>
  <center><h2><red>color styling is done through css variables</red></h2></center>
      <pre style="text-align: left">
        <code class="html">
:root{

<red>common settings</red>
--primary-light: rgb(102, 136, 51);
<red>Primary color #1</red>
--highlight-color: rgb(139, 108, 3);
<red>Highlight color #1</red>
--primary-color: #bc4;
<red>Primary color #2</red>

<red>component settings</red>
--calc-color:var(--primary-color);
<red>bcb-calc: calculator text color</red>
--todo-color:var(--primary-color);
<red>bcb-todo: todo list text color</red>
--header-img:url("../img/greenpc.jpg");
<red>bcb-navbar: Image displayed</red>
<red> as background for the navbar</red>

<red>index.html settings</red>
--wrapper-color:black;
<red>wrapper div background color</red>
}

<center><h2><red>The control panel works like this:</red></h2></center>
&lt;div class="wrapper wrapper3"&gt; &lt;!-- Wrapper--&gt;
<red>the outer div for the section</red>

&lt;h3 class="label-span label-span-h3"&gt;Change colors &lt;/h3&gt;
&lt;span class="label-span"&gt;color&lt;/span&gt;

&lt;input <red>Text color picker</red>
  type="color"
  oninput="

  document
    .documentElement
    .style
    .setProperty('--calc-color', this.value);

  document
    .documentElement
    .style
    .setProperty('--todo-color', this.value);"

  aria-label="color picker"
&gt;

&lt;span class="label-span"&gt;bkgrnd&lt;/span&gt;

&lt;button
<red>transparent button</red>
onclick="document.
documentElement.
style.
setProperty('--wrapper-color','transparent')"&gt;

clear
&lt;/button&gt;

&lt;input
<red>background color picker</red>
  type="color"
  oninput="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', this.value);"

  aria-label="color picker"&gt;

&lt;br&gt;&lt;br&gt;

<center><red>Buttons that change the background color</red></center>

&lt;button onclick="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', 'red')"&gt;red&lt;/button&gt;

&lt;button onclick="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', 'green')"&gt;grn&lt;/button&gt;

&lt;button onclick="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', 'blue')"&gt;blu&lt;/button&gt;

&lt;button onclick="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', 'yellow')"&gt;ylw&lt;/button&gt;

&lt;button onclick="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', 'cyan')"&gt;cyn&lt;/button&gt;

&lt;button onclick="
  document
    .documentElement
    .style
    .setProperty('--wrapper-color', 'magenta')"&gt;mgn&lt;/button&gt;

&lt;/div&gt;&lt;!-- Wrapper--&gt;

</code>
</pre>

  `

  // navbar
  document.querySelector('#slot2').innerHTML = /*html*/`
    <h2>bcb-navbar</h2>
<pre style="text-align: left">
<code class="html">
Usage
    &lt;bcb-navbar
      id="bcb-navbar"
      branding = "Branding"  <red>Text to display in the navbar</red>
      &gt;
    &lt;/bcb-navbar&gt;
</code>
<code class="javascript"
Script setup

    <red>dispatches the following event with the id of the</red>
    <red>button in the details field when a </red>
    <red> or dropdown item is clicked</red>

    this.dispatchEvent(new CustomEvent("bcb-navbar", { detail: id }))

    document.querySelector('bcb-navbar').arry = [
    <red>Array to set up the buttons,</red>
    <red>you can specify as many as you like</red>
    {
    id: 'Green',
    <red>Label on the button and drop down,</red>
    <red>also its the id returned when the button is clicked</red>

    icon: 'fas fa-users'
    <red>Button icon from the font awsome collection included</red>
    }]

    let navbar = document.getElementById('bcb-navbar')
    <red>listen for a navbar event</red>
    navbar.addEventListener('bcb-navbar', (e) => {
    console.log(e.detail)
    if (e.detail === 'Green') {
    console.log('button 1 was clicked')
    setToGreen()
    } })

    const setToGreen = () => {
    let root = document.documentElement
    root.style.setProperty('--primary-color', '#F9C534');
    root.style.setProperty('--primary-light', '#D5391E');
    root.style.setProperty('--header-img', 'url(../img/orange.jpg)');
    }
  </code>
</pre>
`

// input
  document.querySelector('#slot3').innerHTML = /*html*/`
<h2>bcb-input</h2>
      <pre style="text-align: left">
        <code class="html">
      Usage
        &lt;bcb-input
        left="0"
        name="input1"
        <red>name of hidden input field</red>
        value=""
        <red>sets and gets the current value</red>
        id="bcb-input1"
        label="Calculator"
        <red>Text the input placeholder will display</red>
        width="100%"
        <red>width of the input field</red>
        <red>event listener for bcb-input</red>
        min="0"
        max="0"
        type="text"
        <red>type = text or range, with range,</red>
        <red> min and max attributes must be set</red>
        &gt;
        &lt;/bcb-input&gt;
</code>
<code class="javascript"
      Script setup
        <red>Dispatches an event on input change;</red>

        this.dispatchEvent(
          new CustomEvent("bcbinput", {
        detail: {
        value: this.value,
        key,
        elem: this
        }
        })
        );

        detail:
        elem: bcb-input#bcb-input1 <red>returns the element</red>
        key: undefined
        <red>if a key fired this event or undefined if <red>
        </red>event was fired by setting the display variable</red>
        value: "1"
        <red>the current value of the input field</red>
        </code>
      </pre>
`

// checkbox
  document.querySelector('#slot4').innerHTML = /*html*/`
 <h2>bcb-checkbox</h2>
      <pre style="text-align: left">
        <code class="html">
            Usage

          &lt;bcb-checkbox
          id="cb1"
          checked="true"
          <red>true for checked false for unchecked, </red>
          <red>checked is not a boolean attribute</red>
          &gt;
          &lt;/bcb-checkbox&gt;
</code>
<code class="javascript"
            Script setup

          <center><red>the checkbox fires this event when its state changes</red></center>
          this.dispatchEvent(new CustomEvent("bcbcheck", { detail:{
          value: this.value,
          id:this.id
          }}));
        </code>
      </pre>

`

// calculator
  document.querySelector('#slot5').innerHTML = /*html*/`
 <h2>bcb-calculator</h2>
      <pre style="text-align: left">
        <code class="html">
        Usage
  &lt;bcb-calculator&gt;&lt;/bcb-calculator&gt;
</code>
<code class="javascript"
        Script setup
  <center><red>the calculator fires this event when it evaluates an equation</red></center>

  this.dispatchEvent(
    new CustomEvent("bcbcalculator", { detail: this.display }))

  <center><red>detail contains the current display value</red></center>

        </code>
      </pre>
`

// todo
  document.querySelector('#slot6').innerHTML = /*html*/`
 <h2>bcb-todo</h2>
      <pre style="text-align: left">
        <code class="html">
            Usage
      &lt;bcb-todo&gt;&lt;/bcb-todo&gt;
</code>
<code class="javascript"
            Script setup
      <center><red>the todo list fires this event when it changes the list</red></center>

      this.dispatchEvent(
        new CustomEvent('bcbtodo', { detail: this.todos }));

      <center><red>detail contains the current todo list as an array</red></center>

        </code>
      </pre>
`

// content
  document.querySelector('#slot7').innerHTML =/*html*/`
 <h2>bcb-content</h2>
      <pre style="text-align: left">
        <code class="html">
            Usage

<center><red>The content element takes content stored in
named slots and displays it depending on the
value of its slot attribute  </red> </center>


      &lt;bcb-content slot="slot1"&gt;
        &lt;div slot="slot1" id="slot1"&gt; content&lt;/div&gt;
        &lt;div slot="slot2" id="slot2"&gt; content&lt;/div&gt;
        &lt;div slot="slot3" id="slot3"&gt; content&lt;/div&gt;
        &lt;div slot="slot4" id="slot4"&gt; content&lt;/div&gt;
        &lt;div slot="slot5" id="slot5"&gt; content&lt;/div&gt;
        &lt;div slot="slot6" id="slot6"&gt; content&lt;/div&gt;
        &lt;div slot="slot7" id="slot7"&gt; content&lt;/div&gt;
      &lt;/bcb-content&gt;
</code>
<code class="javascript"
            Script setup
      <center><red>the content element fires this event when it changes the content</red></center>
      this.dispatchEvent(
        new CustomEvent('bcbcontent',{detail:this.slot}))
      <center><red>detail contains the current slot being displayed</red></center>


<red>Content is stored in the file bcb-content-data.js in the form of</red>

export function setContent(){
document.querySelector('#slot1').innerHTML = 'HTML HERE'
<red>create a seperate querySelector section for each slot</red>
}

<red>set the slot with javascript</red>

document.querySelector('bcb-tabs').addEventListener('bcb-tabs', e => {
  let content=document.querySelector('bcb-content')
  switch (e.detail) {
    case 'About':
      content.slot='slot1'
      <red>Displays the content of slot1</red>
      break;})

      <red> The code for the element</red>

import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { setContent } from "./bcb-content-data";

export class BcbContent extends LitElement {

  static get properties() {return {slot:String}}

  constructor() {super();setContent()}

  render() {
    this.dispatchEvent(new CustomEvent('bcbcontent', { detail: this.slot }))
    return html'&lt;slot name = "\${this.slot}"&gt; \${ this.slot }&lt;/slot&gt;'}}

customElements.define('bcb-content', BcbContent)

    </code>
  </pre>
`

// tabs
document.querySelector('#slot8').innerHTML = /*html*/`
    <h2>bcb-tabs</h2>
<pre style="text-align: left">
<code class="html">
Usage
    &lt;bcb-tabs&gt;&lt;/bcb-tabs&gt;
</code>
<code class="javascript"
Script setup

    <red>dispatches the following event with the id of the</red>
    <red>button in the details field when a </red>
    <red> or dropdown item is clicked</red>

    this.dispatchEvent(new CustomEvent("bcbtabs", { detail: id }))

    let tabs = document.getElementById('bcb-tabs')
    <red>listen for a tabs event</red>
    tabs.addEventListener('bcbtabs', (e) => {
    console.log(e.detail)
    if (e.detail === 'About') {
    console.log('button 1 was clicked')
    } })

  </code>
</pre>
`

// clock
  document.querySelector('#slot9').innerHTML = /*html*/`
  <h2>bcb-clock</h2>
  <h3>No Attributes, style the parent element as this only returns text</h3>
  <h2>Event listener</h2>
  <pre>
    <code>
document.querySelector('bcb-clock').addEventListener('bcb-clock',e=>{
let sec = e.detail.value.substring(7)
sec=(sec%16).toString(16)
console.log(sec)
document.querySelector('bcb-clock').style.color=\`#\${sec}00\`
})

  <h3>Changes the clocks color based on the second</h3>

  <red><h2>Code for the clock</h2></red>

import {LitElement, html} from '@polymer/lit-element/lit-element.js'

export class BcbClock extends LitElement {
  static get properties(){return {arry: Array, clock: String}}
  constructor(){
    super()
    let timer = setInterval(() => {
      this.clock= new Date().toString().substring(15,25)
      this.dispatchEvent(new CustomEvent("bcb-clock", {detail: {name: "clock",value: this.clock}})
    }, 1000)}
  render(){return html\`\${this.clock}\`}}

customElements.define('bcb-clock',BcbClock)
    </code>
  </pre>
`


  }
