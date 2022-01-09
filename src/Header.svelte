<script>
  import { fade } from "svelte/transition";
  import DarkmodeToggle from "./DarkmodeToggle.svelte";
  import Menu from "./Menu.svelte";

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
    on:click={toggleDarkMode}
  />
  <h1>Sätra Brunn DAO</h1>
  <Menu {darkMode} />
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
    transition: 2s all;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 1.6rem;
    }
    img {
      margin: unset;
      height: 100px;
      width: 100px;
    }
    header:last-child {
      margin-left: auto;
    }
  }
</style>
