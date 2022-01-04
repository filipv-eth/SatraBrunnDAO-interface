<script>
  export let colors = [
    "--dark-red",
    "--red",
    "--blue",
    "--grayish-blue",
    "--light-gray",
    "--gray",
    "--grayish-orange",
    "--brown",
    "--black",
    "--blackish",
  ];
</script>

<svg viewbox={`0 0 ${colors.length * 2} 2`}>
  {#each colors as color, index}
    <circle
      class="circle"
      cx={index * 2 + 1}
      cy={1}
      r="0.9"
      fill={`var(${color})`}
      stroke-width="0.05"
    />
  {/each}
</svg>

<style>
  svg {
    width: 250px;
  }
  circle {
    stroke: var(--light-body);
  }

  :global(body.dark-mode) circle {
    stroke: var(--dark-body);
  }
</style>
