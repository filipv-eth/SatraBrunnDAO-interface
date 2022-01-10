<script>
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";

  let images = [];
  let index = 0;

  [1, 2, 3, 4, 5, 6].forEach((num) => images.push(`images/brunn_${num}.jpeg`));

  function next() {
    index = (index + 1) % images.length;
  }
  function prev() {
    index = (index - 1) % images.length;
  }
  console.log(images);

  onMount(() =>
    setInterval(() => {
      next();
    }, 4000)
  );
</script>

<section>
  <!-- <svg
    class="arrow"
    width="21"
    height="16"
    viewBox="0 0 21 16"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(180)"
    on:click={prev}
  >
    <path
      d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9L20 9V7L0 7L0 9Z"
    />
  </svg> -->
  {#each [images[index]] as src (index)}
    <div transition:fade>
      <img {src} alt="" />
    </div>
  {/each}
  <!-- <svg
    class="arrow"
    width="21"
    height="16"
    viewBox="0 0 21 16"
    xmlns="http://www.w3.org/2000/svg"
    on:click={next}
  >
    <path
      d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9L20 9V7L0 7L0 9Z"
    />
  </svg> -->
</section>
<!-- <img src={currentImage} alt="Sätra Brunn" /> -->

<!-- <button on:click={next}>Next!</button> -->
<style>
  /* img, button {
		position: absolute;
	} */
  section {
    height: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;

    /* max-width: 900px; */
  }
  div {
    position: absolute;
    max-width: 800px;
  }

  img {
    max-width: 750px;
    /* margin: 0rem 1rem; */
    /* position: absolute; */
    /* left: calc(50% - 375px); */
  }

  @media (max-width: 640px) {

    section {
        height: 300px;
    }
    img {
        max-width: 100vw;
    }
  }
</style>
