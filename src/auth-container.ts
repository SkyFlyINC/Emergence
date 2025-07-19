import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/login-form'
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
    //监听登陆成功，然后跳转
    this.addEventListener('login-success', () => {
      // 这里可以添加跳转逻辑，比如跳转到主页
      window.location.href = '/main'; // 假设主页的路径是 /home
    });
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
