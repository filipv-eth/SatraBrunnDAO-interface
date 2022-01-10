<script>
  import Carousell from "./Carousell.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import FAQ from "./FAQ.svelte";

  import ColorPaletteCircles from "./ColorPaletteCircles.svelte";
</script>

<Header />
<main>
  <section id="main-description">
    <article>
      <ColorPaletteCircles />
      <p>
        <b>Sätra Brunn</b> is a 144 acre wellness destination in the suburbs of Stockholm,
        Sweden, renowned for its healing spring water and picturesque scenery.
      </p>
      <hr />
      <p>
        Sätra Brunn DAO plans to buy Sätra Brunn at auction to establish the
        first-ever real world <b>DAO-governed municipality.</b>
      </p>
    </article>
    <img id="map" src="map.png" alt="map" />
  </section>
  <Carousell />
  <FAQ />
</main>
<Footer />

<style>
  :global(body) {
    color: var(--light-body);
    background-image: url("footer-hills.svg"),
      linear-gradient(
        0.47deg,
        rgba(0, 136, 255, 0.2) 0.39%,
        rgba(220, 230, 239, 0.2) 99.58%
      ),
      linear-gradient(0deg, #dce6ef, #dce6ef);
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 801px;
  }

  :global(body.dark-mode) {
    color: var(--dark-body);
    background-image: url("footer-hills.svg"),
      linear-gradient(
        0.47deg,
        rgba(0, 136, 255, 0.2) 0.39%,
        rgba(220, 230, 239, 0.138) 99.58%
      ),
      linear-gradient(0deg, #000, #000);
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 801px;
  }

  #main-description {
    padding-left: 4rem;
    padding-right: 4rem;
    display: flex;
    justify-content: space-around;
  }

  article {
    width: 50%;
  }

  main {
    margin-bottom: 4rem;
  }

  img {
    width: 300px;
  }
  p {
    font-size: x-large;
  }

  hr {
    border: 1px solid #343837;
  }

  #map {
    height: 300px;
  }

  @media (max-width: 640px) {
    :global(html) {
      background-size: 680px;
    }

    :global(body) {
      overflow-y: scroll;
      overflow-x: hidden;
    }

    article {
      width: unset;
    }

    p {
      font-size: large;
    }
    #main-description {
      max-width: none;
      flex-direction: column;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    #map {
      display: none;
      /* margin: 0 auto;
      width: 175px;
      height: 175px; */
    }
  }
</style>
