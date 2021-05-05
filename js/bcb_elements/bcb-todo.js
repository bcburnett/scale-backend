import { LitElement, html } from '@polymer/lit-element/'
import { Styles } from './bcb-todo-style';
import './bcb-input'
import './bcb-checkbox'

export class BcbTodo extends LitElement {

  static get properties() {
    return {
      todos: Array,
      label: String,
      tooltip:String
    }
  }

  constructor() {
    super()
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([{ "task": "feed the alligator", "done": "true" }, { "task": "walk the doggies     ", "done": "true" }, { "task": "feed the dog", "done": "false" }]))
    }
    this.todos = JSON.parse(localStorage.getItem('todos'))
  }

  render() {
    const {tooltip,label} = this
    return html`
    ${Styles}
  <div class="container ${tooltip ? 'tooltip' : ''}"><span class="${tooltip ? '' : 'hidden'}">${tooltip}</span><!-- Container-->
    <div class="header"><!-- Header-->
      <div class="header__wrapper"><!-- Header Wrapper-->
        <bcb-input
        label="${label}"
        width="87%"
        class="header__input"
        value=''
        @bcbinput="${e => this.addItem(e)}"
        left="45"
        ></bcb-input>
        <span tabindex="0" class="fa fa-2x fa-list-ul icon"></span>
      </div><!-- Header Wrapper-->
    </div> <!-- Header-->
    <div class="open-list" id="open-list"><!-- Open List-->
<h3>Open Todos</h3>
      ${this.makeTodos('false')}
<h3>Done Todos</h3>
      ${this.makeTodos('true')}
    </div><!--Open List-->
  </div><!-- Container-->
    `
  }

  makeTodos(state) {
    return this.todos.map((e, i) => {
      if (e.done === state) {
        return html`
      <div class="item"><!-- Item-->
      <div class="textedit" }><!-- textedit-->
      <p class="text" id="para${i}" @click="${this.editTodo}">${e.task} </p>
      <input label="Edit todo" size="20" class="iteminput hidden" id="input${i}" @focusout="${this.editTodo}"  @keyup="${this.editTodo}">
        </div><!--textedit-->
        <i class="fas fa-trash-alt" id="trash${i}" @click="${this.deleteTodo}"></i>
        <bcb-checkbox id="cb${i}" checked="${e.done}" @bcbcheck="${e => this.todochecked(e)}" ></bcb-checkbox>
      </div><!-- Item-->
      `}
      return
    })
  }

  todochecked(e) {
    let value = e.target,
      id = value.id,
      index = id.substring(2)
    this.updatetodos('CHECKED', e.target.value, index)
  }


  deleteTodo(e) {
    let index = e.path[0].id.substring(5)
    this.updatetodos('DELETE', null, index)
  }

  editTodo(e) {

    if (e.type === 'click') {

      if (e.path[0].nodeName === 'I') {
        let input = e.path[1].children[0].children[1]
        let para = e.path[1].children[0].children[0]
        para.classList.toggle('hidden')
        input.classList.toggle('hidden')
        input.value = para.textContent.trim()
      }
      if (e.path[0].nodeName === 'P') {
        e.path[0].classList.toggle('hidden')
        e.path[1].lastElementChild.classList.toggle('hidden')
        e.path[1].lastElementChild.value = e.path[0].textContent.trim()
        e.path[1].lastElementChild.focus()
      }
    }


      if (e.key === 'Enter' || e.type === 'focusout') {
        this.updatetodos('MODIFY', e.path[0].value, e.path[0].id.substring(5))
        e.path[0].classList.add('hidden')
        e.path[0].parentNode.firstElementChild.classList.remove('hidden')
      }

  }

  addItem(e) {
    if (e.detail.key === 'Enter') {
      let task = e.detail.value
      if (task === '') return
      let done = 'false'
      let todo = {
        task,
        done
      }
      this.updatetodos('ADD', todo)
      e.path[0].value=''
    }
  }

  updatetodos(action, todo, index) {

    if (action === 'ADD') {
      this.todos = Array(todo,...this.todos)
    }

    if (action === 'MODIFY') {
      this.todos[index].task = todo
      this.requestUpdate()

    }

    if (action === 'CHECKED') {
      this.todos[index].done = todo
      this.requestUpdate()
    }

    if (action === 'DELETE') {
      this.todos.splice(index, 1)
      this.requestUpdate()
    }
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.shadowRoot.querySelector('bcb-input').shadowRoot.querySelector('input').focus()
    this.updateComplete.then(() => {
    this.dispatchEvent(new CustomEvent('bcbtodo', { detail: this.todos }));
    })
  }
}

customElements.define('bcb-todo', BcbTodo)
