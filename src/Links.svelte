<script>
  import { links } from "./links.js";
</script>

{#each links as link}
  <a href={link.url}>{link.label}</a>
{/each}

<style>
  a {
    color: var(--grayish-orange);
    font-weight: 700;
    font-size: 1.5rem;
  }

  @media (max-width: 640px) {
    a {
      font-size: 1rem;
    }
  }
</style>
