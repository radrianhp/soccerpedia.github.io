class footerBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="page-footer orange">
      <div class="footer-copyright">
        <div class="container">
        © 2020 Copyright SoccerPedia.id
        </div>
      </div>
    </footer>        
        `;
  }
}

customElements.define("footer-bar", footerBar);
