<script>
  import { ethers } from "ethers";
  import { jb_abi } from "./juicebox_abi.js";
  import { getLink } from "./links";
  import { slide } from "svelte/transition";

  let loading = true;
  let value = 0;
  let ethValue = 0;

  const provider = ethers.getDefaultProvider();
  const jb_contract = new ethers.Contract(
    "0xd569D3CCE55b71a8a3f3C418c329A66e5f714431",
    jb_abi,
    provider
  );

  jb_contract.balanceOf("253").then((result) => {
    ethValue = ethers.utils.formatEther(result._hex);
    value = ethValue / 2500;
    loading = false;
  });
</script>

{#if !loading}
  <div id="wrapper" transition:slide>
    <h2>Raised: {ethValue}Ξ/2500Ξ</h2>
    <svg
      id="container"
      width="667"
      height="50"
      viewBox="0 0 800 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="799"
        height="49"
        rx="25.5"
        fill="#DCE6EF"
        stroke="#343837"
      />
      {#if value < 0.025}
        <path
          fill="#A3433B"
          stroke="#343837"
          d="M.58,20.83a19.84,19.84,0,0,0,4,11.9,19.73,19.73,0,0,0,2.6-10.39A19.13,19.13,0,0,0,3.51,10.52,19.72,19.72,0,0,0,.58,20.83Z"
          transform="translate(0.17 4.78)"
        />
      {:else if value < 0.05}
        <path
          fill="#A3433B"
          stroke="#343837"
          d="M.58,20.83a20.2,20.2,0,0,0,9.51,17c4.86-2.74,9.39-7.67,9.57-16.58C19.85,11.89,15.05,6.72,10,3.87A20.18,20.18,0,0,0,.58,20.83Z"
          transform="translate(-0.4 2.5) scale(1.1)"
        />
      {:else}
        <rect
          x="0.5"
          y="0.5"
          width={value * 799}
          height="49"
          rx="25.5"
          fill="#A3433B"
          stroke="#343837"
        />
      {/if}
    </svg>
    <p><i>donate at <a href={getLink("juicebox")}>juicebox.money</a></i></p>
  </div>
{/if}

<style>
  #wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
  }
</style>
