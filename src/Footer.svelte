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
    margin-left: 0 auto;

    display: flex;
    justify-content: space-around;
  }

  footer {
    position: absolute;
    padding-top: 150px;
  }
</style>
