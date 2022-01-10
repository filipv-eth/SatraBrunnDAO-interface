<script>
  export let darkMode;
  import Hamburger from "./Hamburger.svelte";
  import Cross from "./Cross.svelte";
  import { links } from "./links.js";

  let open = false;

  function toggle() {
    open = !open;
  }
</script>

<!-- TODO definitely needs a cleanup, not refactoring for now as it's
likely to change -->

<!-- Links for screens > 640px -->
<nav class="large" class:darkMode>
  {#each links.slice(0, -1) as link}
    <a href={link.url}>{link.label}</a>
  {/each}
</nav>

<!-- Hamburger and menu for screens <640px -->
<Hamburger click={toggle} />
<div class="overlay" class:darkMode class:hidden={!open}>
  <div class="menu-icon" on:click={toggle}>
    <Cross />
  </div>
  <nav class:darkMode class="small">
    {#each links.slice(0, -1) as link}
      <a href={link.url}>{link.label}</a>
    {/each}
  </nav>
</div>

<style>
  nav {
    display: flex;
    font-size: 24px;
    justify-content: space-around;
    width: 50%;
  }

  nav a {
    color: #343837;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 300;
  }
  nav.darkMode a {
    color: var(--dark-body);
  }

  .hidden {
    display: none !important;
  }
  .overlay {
    z-index: 999;
    position: fixed;
    overflow: none;
    top: 0;
    height: 100%;
    width: 100vw;
    background: linear-gradient(
        0.47deg,
        rgba(0, 136, 255, 0.2) 0.39%,
        rgba(220, 230, 239, 0.2) 99.58%
      ),
      linear-gradient(0deg, #dce6ef, #dce6ef);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay.darkMode {
    background: linear-gradient(
        0.47deg,
        rgba(0, 136, 255, 0.2) 0.39%,
        rgba(220, 230, 239, 0.138) 99.58%
      ),
      linear-gradient(0deg, #000, #000);
  }

  .small {
    flex-direction: column;
    text-align: center;
    height: 30%;
  }

  @media (min-width: 640px) and (max-width: 850px) {
    nav {
      font-size: 18px;
    }
  }

  @media (max-width: 640px) {
    nav.large {
      display: none;
    }

    .menu-icon {
      display: unset;
    }

    .overlay .menu-icon {
      position: absolute;
      top: 60px;
      right: 50px;
    }
  }
</style>
