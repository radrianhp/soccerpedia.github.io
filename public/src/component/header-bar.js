class HeaderBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `        
    <nav class="orange" role="navigation">
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo"><i class="icon hide-on-med-and-down"></i>SoccerPedia</a>
        <a href="#" class="sidenav-trigger" data-target="nav-mobile">☰</a>

        <ul class="topnav right hide-on-med-and-down"></ul>
        <ul class="sidenav" id="nav-mobile"></ul>
      </div>
    </nav>`;
  }
}

customElements.define("header-bar", HeaderBar);
