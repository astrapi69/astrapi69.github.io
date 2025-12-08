class HeaderComponent extends HTMLElement {
    connectedCallback() {
        fetch('web-component/html/header_component.html')
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;

                // Beim Laden Theme initial setzen
                const savedTheme = localStorage.getItem('bfrei_theme');
                const prefersDark = window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches;

                const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', currentTheme);

                const toggleButton = this.querySelector('[data-theme-toggle]');
                if (toggleButton) {
                    toggleButton.addEventListener('click', () => {
                        const oldTheme = document.documentElement.getAttribute('data-theme') === 'dark'
                            ? 'dark'
                            : 'light';
                        const newTheme = oldTheme === 'dark' ? 'light' : 'dark';

                        document.documentElement.setAttribute('data-theme', newTheme);
                        localStorage.setItem('bfrei_theme', newTheme);
                    });
                }
            })
            .catch(error => {
                console.error('Fehler beim Laden des Header-Komponenten:', error);
                this.innerHTML = '<header><h1>BFREI</h1></header>';
            });
    }
}

customElements.define('header-component', HeaderComponent);
