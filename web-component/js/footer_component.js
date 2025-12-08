class FooterComponent extends HTMLElement {
    async connectedCallback() {
        try {
            const response = await fetch('web-component/html/footer_component.html');
            if (!response.ok) {
                console.error('Failed to load footer_component.html:', response.status, response.statusText);
                return;
            }

            const html = await response.text();
            this.innerHTML = html;

            // Jahr NACH dem Einfügen setzen
            const yearSpan = this.querySelector('#year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            } else {
                console.warn('FooterComponent: #year element not found');
            }
        } catch (error) {
            console.error('Error loading footer_component.html:', error);
        }
    }
}

customElements.define('footer-component', FooterComponent);
