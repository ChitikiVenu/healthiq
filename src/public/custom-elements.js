import { initHealthIQ } from 'public/healthiq.js';

class HealthIQBrowser extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div id="health-iq-browser"></div>`;
    initHealthIQ(this.querySelector('#health-iq-browser'));
  }
}

customElements.define('health-iq-browser', HealthIQBrowser);
