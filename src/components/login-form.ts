import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import JWT from '../utils/jwt'

@customElement('login-form')
export class LoginForm extends LitElement {
  @state() private username = ''
  @state() private password = ''
  @state() private error = ''
  @state() private loading = false

  createRenderRoot() {
    return this
  }

  private async handleLogin(e: Event) {
    e.preventDefault()
    this.error = ''
    this.loading = true

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // 登录成功,保存token
        JWT.setToken(data.token)
        // 发出登录成功事件
        this.dispatchEvent(new CustomEvent('login-success', {
          detail: data.user,
          bubbles: true,
          composed: true
        }))
      } else {
        this.error = data.message || '登录失败'
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
            <h3 class="font-bold text-gray-800 dark:text-white">登录</h3>
            
                        ${this.error ? html`
              <div class="space-y-5">
  <div class="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30" role="alert" tabindex="-1" aria-labelledby="hs-bordered-red-style-label">
    <div class="flex">
      <div class="shrink-0">
        <!-- Icon -->
        <span class="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
        <!-- End Icon -->
      </div>
      <div class="ms-3">
        <h3 id="hs-bordered-red-style-label" class="text-gray-800 font-semibold dark:text-white">
          错误
        </h3>
        <p class="text-sm text-gray-700 dark:text-neutral-400">
          ${this.error}
        </p>
      </div>
    </div>
  </div>
</div>
            ` : ''}

            <form @submit=${this.handleLogin}>
              <!-- 账号输入 -->
              <div class="relative">
                <input 
                  id="hs-floating-gray-input-email" 
                  .value=${this.username}
                  @input=${(e: InputEvent) => this.username = (e.target as HTMLInputElement).value}
                  class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder="you@email.com"
                  ?disabled=${this.loading}>
                <label for="hs-floating-gray-input-email" class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500">账号</label>
              </div>

              <!-- 密码输入 -->
              <div class="relative mt-3">
                <input 
                  type="password"
                  id="hs-floating-gray-input-password"
                  .value=${this.password}
                  @input=${(e: InputEvent) => this.password = (e.target as HTMLInputElement).value}
                  class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder="********"
                  ?disabled=${this.loading}>
                <label for="hs-floating-gray-input-password" class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:translate-x-0.5 peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500">密码</label>
              </div>

              <button
                type="submit"
                class="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                ?disabled=${this.loading}>
                ${this.loading ? '登录中...' : '登录'}
              </button>
            </form>

            <div class="text-center text-sm text-gray-500">
              还没有账号? 
              <a href="#" @click=${this._toRegister} class="text-blue-600 hover:text-blue-700">注册</a>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private _toRegister(e: Event) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('switch-to-register', {
      bubbles: true,
      composed: true
    }))
  }

  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'login-form': LoginForm
  }
}
