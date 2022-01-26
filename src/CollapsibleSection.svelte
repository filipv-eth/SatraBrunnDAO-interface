<script>
  // based on suggestions from:
  // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
  export let color;
  export let headerText;

  let expanded = false;
</script>

<!-- NOTE: ugly transform below is to silence console error of setting transform to false -->
<!-- TODO fix headers -->
<div class="collapsible">
  <h3>
    <button aria-expanded={expanded} on:click={() => (expanded = !expanded)}
      ><svg
        class="arrow"
        width="21"
        height="16"
        viewBox="0 0 21 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9L20 9V7L0 7L0 9Z"
        />
      </svg>
      <h2>{headerText}</h2>

      <svg
        class="circle"
        viewbox="0 0 100 100"
        stroke="#343837"
        stroke-width="3px"
        ><circle cx="50" cy="50" r="48" fill={`var(${color})`} /></svg
      >
    </button>
  </h3>

  {#if expanded}
    <slot />
  {/if}
</div>

<style>
  h2 {
    font-weight: 400;
    font-style: italic;
    font-family: "Red Hat Display", sans-serif;
    margin-left: 1rem;
  }
  
  h3 {
    cursor: pointer;
    margin: 0;
  }

  button {
    background-color: unset;
    border: none;
    border-bottom: 1px solid var(--light-body);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0;
  }

  :global(body.dark-mode) button {
    border-bottom: 1px solid var(--dark-body);
  }

  .circle {
    height: 1.5rem;
    width: 1.5rem;
    stroke: var(--light-body);
  }

  .arrow {
    fill: var(--light-body);
  }

  :global(body.dark-mode) .circle {
    stroke: var(--dark-body);
  }

  :global(body.dark-mode) .arrow {
    fill: var(--dark-body);
  }

  button[aria-expanded="true"] svg {
    transform: rotate(90deg);
  }

  svg:last-of-type {
    margin-left: auto;
  }
</style>
