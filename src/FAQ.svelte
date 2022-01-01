<script>
  import CollapsibleSection from "./CollapsibleSection.svelte";
  import { slide } from "svelte/transition";

  let questions = [
    {
      q: "What is a DAO?",
      a: "DAO stands for decentralized autonomous organization. A DAO is an entity with no central leadership and little or no hierarchical management, where proposals are instead made from individual contributors and voted on by the community. A DAO is represented by a program called a <i>smart contract</i> that defines the rules with which the DAO operates. The financial records and smart contract for a DAO are both typically stored on a blockchain.",
      c: "--red",
    },
    {
      q: "How will Sätra Brunn DAO raise money?",
      a: 'Sätra Brunn DAO will be using <a href="https://juicebox.money/">Juicebox</a>, a powerful and lightweight programmable treasury that allows contributors to donate ETH in exchange for tokens. These tokens can then be used to vote within the DAO, meaning that governance power rests in the hands of those who donate their resources, time, and effort to the DAO.',
      c: "--blue",
    },
    {
      q: "Why Sätra Brunn?",
      a: `Sätra Brunn has the potential to become a major hub for the European web3 community. With rapidly increasing demand for in-person web3 meeting spaces, infrastructure like Sätra Brunn’s is quickly becoming vital to the ecosystem. The village not only hosts over 3,600 attendees at conferences each year, but features 70 buildings including a fully operational beverage production company, a bathhouse and spa, and numerous lodging options. <br><br> Sätra Brunn is not just one of the preeminent wellness destinations in Europe—it is a loving community with 320 years of history behind it, with the potential to play a major role in the web3 revolution.`,
      c: "--grayish-blue",
    },
    {
      q: "How can I join?",
      a: `If you would like to become a contributor, take a look at <a href="https://www.notion.so/How-to-Get-Started-f8169ff245c9443bb87bd9ed86155975">How to Get Started</a> on the <a href="https://www.notion.so/2ecbecf19ac3455a83ef6b6206e193bc">Sätra Brunn DAO Notion</a>.`,
      c: "--light-gray",
    },
    {
      q: "Is there a roadmap?",
      a: `Sätra Brunn DAO is focused on the long term sustainability of this project—our primary goal is to preserve the history and legacy of Sätra Brunn, and to solidify Sätra Brunn as a venue for the future of art and technology. <br><br> The first phase of this project will be centered around fundraising and awareness within the web3 community. Longer term, we are focused on preparing for the transition in ownership, growing our team of builders and contributors, and preserving Sätra Brunn’s community and values.`,
      c: "--grayish-orange",
    },
    {
      q: "When can I donate?",
      a: "Contributors are working around the clock to guarantee the sustainability of this project, and donations are expected to open up in the next 2-5 days.",
      c: "--brown",
    },
    {
      q: "Where can I learn more?",
      a: `To learn more, you can take a look at our <a href="https://www.notion.so/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc)">Notion</a>, follow us on <a href="https://twitter.com/SatraBrunn">Twitter</a>, and join the discussion in our <a href="http://discord.gg/ZMtXgYrm5N">Discord server</a>!`,
      c: "--black",
    },
  ];
</script>

<section>
  {#each questions as question}
    <CollapsibleSection headerText={question.q} color={question.c}>
      <p transition:slide>
        {#if question.a}
          {@html question.a}
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
