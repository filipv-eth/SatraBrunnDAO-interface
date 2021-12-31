<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<Header />
<main>
  <section id="main-description">
    <article>
      <img
        id="color-palette"
        src="circle-palette.png"
        alt="color palette in circles"
      />
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
</main>
<Footer />

<style>
  :global(html) {
    /* The light background color
		Putting it here, instead of global.css, as we will dynamically want to switch between dark and light
		*/
    background: linear-gradient(
        0.47deg,
        rgba(0, 136, 255, 0.2) 0.39%,
        rgba(220, 230, 239, 0.2) 99.58%
      ),
      linear-gradient(0deg, #dce6ef, #dce6ef);
      background-image: url('footer-hills.svg');
      background-position: bottom;
      background-repeat: repeat-x;
      /* background-size: 800px; */
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

  img {
    width: 300px;
  }
  p {
    font-size: x-large;
  }

  hr {
    border: 1px solid gray;
  }

  #color-palette {
    width: 250px;
  }

  #map {
    height: 300px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
