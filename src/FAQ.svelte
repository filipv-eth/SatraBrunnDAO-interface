<script>
  import CollapsibleSection from "./CollapsibleSection.svelte";
  import { slide } from "svelte/transition";

  let questions = [
    {
      q: "What is a DAO?",
      a: "DAO stands for decentralized autonomous organization. A DAO is an entity with no central leadership and little or no hierarchical management, where proposals are instead made from individual contributors and voted on by the community. A DAO is represented by a program called a smart contract that defines the rules with which the DAO operates. The financial records and smart contract for a DAO are both typically stored on a blockchain.",
      c: "--red",
    },
    { q: "How will Sätra Brunn DAO raise money?", c: "--blue" },
    { q: "Why Sätra Brunn?", c: "--grayish-blue" },
    { q: "How can I join?", c: "--light-gray" },
    { q: "Is there a roadmap?", c: "--grayish-orange" },
    { q: "When can I donate?", c: "--brown" },
    { q: "Where can I learn more?", c: "--black" },
  ];
</script>

<section>
  {#each questions as question}
    <CollapsibleSection headerText={question.q} color={question.c}>
      <p transition:slide>
        {#if question.a}
          {question.a}
        {:else}
          <i transition:slide>Info coming soon.</i>
        {/if}
      </p>
    </CollapsibleSection>
  {/each}
</section>

<style>
  section {
    max-width: 900px;
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  p {
    font-size: large;
    padding: 1rem;
  }
</style>
