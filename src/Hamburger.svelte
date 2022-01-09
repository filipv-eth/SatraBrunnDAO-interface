<script>
  export let click;
</script>

<svg
  on:click={click}
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="1" y="1" width="38" height="38" rx="9" stroke-width="2" />
  <path
    d="M10 13H30"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M10 20H30"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M10 27H30"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style>
  svg {
    height: 40px;
    width: 40px;
    stroke: var(--light-body);
    margin-left: auto;
    margin-right: 0.5rem;
  }
  :global(body.dark-mode) svg {
    stroke: var(--dark-red);
  }

  @media (min-width: 640px) {
    svg {
      display: none;
    }
  }
</style>
