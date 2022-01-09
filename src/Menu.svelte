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

<nav class="large" class:darkMode>
  {#each links.slice(0, -1) as link}
    <a href={link.url}>{link.label}</a>
  {/each}
</nav>

<div class="menu-icon" on:click={toggle} class:hidden={open}>
  <Hamburger />
</div>
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

  .menu-icon {
    display: none;
    /* Manually pixel-pushed with darkmode toggle as reference */
    margin-top: 6px;
    margin-left: auto;
  }

  .hidden {
    display: none !important;
  }
  .overlay {
    position: fixed;
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
