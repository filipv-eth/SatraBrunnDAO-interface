<script>
  import Links from "./Links.svelte";
</script>

<footer>
  <nav>
    <Links />
  </nav>
</footer>

<style>
  nav {
    z-index: 999;
    width: 100vw;
    max-width: 1200px;
    padding-top: 120px;
    margin: 0 auto;
  }
  footer {
    /* Should be approx as high as the hills SVG */
    height: 200px;
  }
</style>
