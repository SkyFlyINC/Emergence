import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('login-form')
export class LoginForm extends LitElement {

  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  @property({ type: Number })
  count = 0
  createRenderRoot() {
    return this; // 返回 this 而不是 shadowRoot
  }
  render() {
    return html`
        <div class="space-y-3">
    <div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
  <div class="space-y-3 p-4 md:p-5">
    <h3 class="font-bold text-gray-800 dark:text-white">
      登录
    </h3>
            <!-- Floating Input -->
  <div class="relative">
    <input id="hs-floating-gray-input-email" class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    not-placeholder-shown:pt-6
    not-placeholder-shown:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="you@email.com">
    <label for="hs-floating-gray-input-email" class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-not-placeholder-shown:scale-90
      peer-not-placeholder-shown:translate-x-0.5
      peer-not-placeholder-shown:-translate-y-1.5
      peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500">账号</label>
  </div>
  <!-- End Floating Input -->

  <!-- Floating Input -->
  <div class="relative">
    <input type="password" id="hs-floating-gray-input-passowrd" class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    not-placeholder-shown:pt-6
    not-placeholder-shown:pb-2
    autofill:pt-6
    autofill:pb-2" placeholder="********">
    <label for="hs-floating-gray-input-passowrd" class="absolute top-0 start-0 p-4 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-not-placeholder-shown:scale-90
      peer-not-placeholder-shown:translate-x-0.5
      peer-not-placeholder-shown:-translate-y-1.5
      peer-not-placeholder-shown:text-gray-500 dark:peer-not-placeholder-shown:text-neutral-500 dark:text-neutral-500">密码</label>
  </div>
  <!-- End Floating Input -->

    <button type="button"
      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
      登录
    </button>
  </div>
</div>

  </div>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'login-form': LoginForm
  }
}
