<script>
  import DarkmodeToggle from "./DarkmodeToggle.svelte";
  import { links } from "./links.js";
  import { fade } from "svelte/transition";

  import { darkMode as darkModeStore, toggleDarkMode } from "./stores.js";

  let darkMode;
  darkModeStore.subscribe((value) => {
    darkMode = value;
  });
</script>

<header>
  <img
    src={darkMode ? "darkLogo.png" : "lightLogo.png"}
    alt="logo"
    in:fade={{ delay: 5000 }}
    on:click={toggleDarkMode}
  />
  <h1>Sätra Brunn DAO</h1>
  <nav class:darkMode>
    {#each links.slice(0, -1) as link}
      <a href={link.url}>{link.label}</a>
    {/each}
  </nav>
  <DarkmodeToggle {darkMode} toggle={toggleDarkMode} />
</header>

<style>
  header {
    display: flex;
    align-items: center;
  }
  img {
    margin: 1rem;
    height: 125px;
    width: 125px;
    transition: 5s all;
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
  nav.darkMode a {
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
