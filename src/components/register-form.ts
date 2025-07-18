import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('register-form')
export class RegisterForm extends LitElement {
  @state() private username = ''
  @state() private password = ''
  @state() private email = ''
  @state() private error = ''
  @state() private loading = false

  createRenderRoot() {
    return this
  }

  private async handleRegister(e: Event) {
    e.preventDefault()
    this.error = ''
    this.loading = true

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email
        })
      })

      const data = await response.json()

      if (response.ok) {
        // 注册成功,保存token
        localStorage.setItem('token', data.token)
        // 发出注册成功事件
        this.dispatchEvent(new CustomEvent('register-success', {
          detail: data.user,
          bubbles: true,
          composed: true
        }))
      } else {
        this.error = data.message || '注册失败'
      }
    } catch (err) {
      this.error = '服务器错误'
    } finally {
      this.loading = false
    }
  }

  render() {
    return html`
      <div class="space-y-3">
        <div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div class="space-y-3 p-4 md:p-5">
            <h3 class="font-bold text-gray-800 dark:text-white">注册</h3>
            
            ${this.error ? html`
              <div class="text-red-500 text-sm">${this.error}</div>
            ` : ''}

            <form @submit=${this.handleRegister}>
              <!-- 用户名输入 -->
              <div class="relative">
                <input 
                  id="username-input"
                  .value=${this.username}
                  @input=${(e: InputEvent) => this.username = (e.target as HTMLInputElement).value}
                  class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
                  focus:pt-6
                  focus:pb-2
                  not-placeholder-shown:pt-6
                  not-placeholder-shown:pb-2
                  autofill:pt-6
                  autofill:pb-2"
                  placeholder="your_username"
                  ?disabled=${this.loading}
                  required>
                <label for="username-input" 
                  class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:scale-90
                  peer-focus:translate-x-0.5
                  peer-focus:-translate-y-1.5
                  peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                  peer-not-placeholder-shown:scale-90
                  peer-not-placeholder-shown:translate-x-0.5
                  peer-not-placeholder-shown:-translate-y-1.5
                  peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500">用户名</label>
              </div>

              <!-- 邮箱输入 -->
              <div class="relative mt-3">
                <input 
                  type="email"
                  id="email-input"
                  .value=${this.email}
                  @input=${(e: InputEvent) => this.email = (e.target as HTMLInputElement).value}
                  class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
                  focus:pt-6
                  focus:pb-2
                  not-placeholder-shown:pt-6
                  not-placeholder-shown:pb-2
                  autofill:pt-6
                  autofill:pb-2"
                  placeholder="you@example.com"
                  ?disabled=${this.loading}
                  required>
                <label for="email-input" 
                  class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:scale-90
                  peer-focus:translate-x-0.5
                  peer-focus:-translate-y-1.5
                  peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                  peer-not-placeholder-shown:scale-90
                  peer-not-placeholder-shown:translate-x-0.5
                  peer-not-placeholder-shown:-translate-y-1.5
                  peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500">邮箱</label>
              </div>

              <!-- 密码输入 -->
              <div class="relative mt-3">
                <input 
                  type="password"
                  id="password-input"
                  .value=${this.password}
                  @input=${(e: InputEvent) => this.password = (e.target as HTMLInputElement).value}
                  class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder="********"
                  ?disabled=${this.loading}
                  required>
                <label for="password-input" class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500">密码</label>
              </div>

              <button
                type="submit"
                class="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                ?disabled=${this.loading}>
                ${this.loading ? '注册中...' : '注册'}
              </button>
            </form>

            <div class="text-center text-sm text-gray-500">
              已有账号? 
              <a href="#" @click=${this._toLogin} class="text-blue-600 hover:text-blue-700">登录</a>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private _toLogin(e: Event) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('switch-to-login', {
      bubbles: true,
      composed: true
    }))
  }
}
