<script>
  import Header from "./Header.svelte";
</script>

<Header />
<main />

<style>
  :global(body) {
    /* The light background color
		Putting it here, instead of global.css, as we will dynamically want to switch between dark and light
		*/
    background: linear-gradient(
        0.47deg,
        rgba(0, 136, 255, 0.2) 0.39%,
        rgba(220, 230, 239, 0.2) 99.58%
      ),
      linear-gradient(0deg, #dce6ef, #dce6ef);
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
