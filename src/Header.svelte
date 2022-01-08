<script>
  import DarkmodeToggle from "./DarkmodeToggle.svelte";
  import { links } from "./links.js";

  function toggleDarkMode() {
    window.document.body.classList.toggle("dark-mode");
  }
</script>

<header>
  <img src="logo.svg" alt="logo" on:click={toggleDarkMode} />
  <h1>Sätra Brunn DAO</h1>
  <nav>
    {#each links.slice(0, -1) as link}
      <a href={link.url}>{link.label}</a>
    {/each}
  </nav>
  <DarkmodeToggle />
</header>

<style>
  header {
    display: flex;
    align-items: center;
  }
  img {
    margin: 1rem;
  }
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
  :global(body.dark-mode) a {
    color: var(--dark-body);
  }

  @media (min-width: 640px) and (max-width: 850px) {
    nav {
      font-size: 18px;
    }
  }

  @media (max-width: 640px) {
    nav {
      display: none;
    }
    header:last-child {
      margin-left: auto;
    }
  }
</style>
