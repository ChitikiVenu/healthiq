// public/custom-elements.js
// Connects the <health-iq-browser> custom element to our Health IQ app

import { initHealthIQ } from 'public/healthiq.js';

class HealthIQBrowser extends HTMLElement {
  connectedCallback() {
    // Create a container inside this custom element
    this.innerHTML = `
      <div id="health-iq-browser"></div>
    `;

    // Call the app initializer from healthiq.js
    initHealthIQ(
      this.querySelector('#health-iq-browser')
    );
  }
}

// Register the custom HTML tag <health-iq-browser>
customElements.define('health-iq-browser', HealthIQBrowser);
