<script>
  const colors = [
    "--blue",
    "--blackish",
    "--grayish-orange",
    "--brown",
    "--dark-red",
    "--black",
  ];
</script>

<header>
  <img src="logo.svg" alt="logo" />
  <h1>Sätra Brunn DAO</h1>
  <svg viewbox={`0 0 ${colors.length * 3} 2`}>
    {#each colors as color, index}
      <rect width="3" height="2" x={`${index * 3}`} fill={`var(${color})`} />
    {/each}
  </svg>
</header>

<style>
  header {
    display: flex;
    align-items: center;
  }
  img {
    margin: 1rem;
  }

  svg {
    margin-left: auto;
    max-width: 250px;
  }

  @media (max-width: 640px) {
    svg {
      display: none;
    }
  }
</style>
