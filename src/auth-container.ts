import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/login'
import './components/register-form'

@customElement('auth-container')
export class AuthContainer extends LitElement {
  @state() private showLogin = true

  createRenderRoot() {
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('switch-to-register', () => this.showLogin = false)
    this.addEventListener('switch-to-login', () => this.showLogin = true)
  }

  render() {
    return html`
      ${this.showLogin 
        ? html`<login-form></login-form>` 
        : html`<register-form></register-form>`
      }
    `
  }
}
