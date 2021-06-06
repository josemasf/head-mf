const template = document.createElement('template');
template.innerHTML = `
<style>
    @import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";        
</style>

<header>
<nav class="navbar" role="navigation" aria-label="main navigation">
<div class="navbar-brand">
  <a class="navbar-item" href="https://bulma.io">
    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
  </a>

  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</div>

<div id="navbarBasicExample" class="navbar-menu">
  <div class="navbar-start">
    <a class="navbar-item">
      Home
    </a>

    <a class="navbar-item">
      Documentation
    </a>

    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        More
      </a>

      <div class="navbar-dropdown">
        <a class="navbar-item">
          About
        </a>
        <a class="navbar-item">
          Jobs
        </a>
        <a class="navbar-item">
          Contact
        </a>
        <hr class="navbar-divider">
        <a class="navbar-item">
          Report an issue
        </a>
      </div>
    </div>
  </div>

  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a class="button is-primary">
          <strong>Sign up</strong>
        </a>
        <button class="button is-light" id="login">
          Log in
        </button>
      </div>
    </div>
  </div>
</div>
</nav>
</header>
`;

//import "../node_modules/browser";

//const messageBus = new MessageBus();

class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    login(){
        console.log('login clicked')
        this.dispatchEvent(new CustomEvent("login"));
        //messageBus.publish('internalchannel', 'login', {message: 'login', from: 'vue head'});
    }

    connectedCallback() {
        const {
            shadowRoot
        } = this;
        const node = document.importNode(template.content, true);
        shadowRoot.appendChild(node);

        this.button = this.shadowRoot.querySelector("button#login")
        this.button.addEventListener("click", this.login.bind(this));
    }
}

if (!customElements.get('app-header')) {
    customElements.define('app-header', Header);
}
