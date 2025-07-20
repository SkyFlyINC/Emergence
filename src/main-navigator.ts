import { LitElement, html,} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { JWT } from './utils/jwt';

@customElement('course-manager')
export class MainNavigator extends LitElement {
  @state() currentView = 'list';
  @state() editingCourse = null;
  @state() courses = [];



  connectedCallback() {
    super.connectedCallback();
    this.loadCourses();
    this.handleHashChange();
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.handleHashChange.bind(this));
  }

  handleHashChange() {
    const hash = window.location.hash;

  }

  async loadCourses() {
    try {
      const response = await JWT.fetch('/api/course', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to load courses');
      this.courses = await response.json();
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }


  render() {
    return html`

    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-navigator': MainNavigator;
  }
}