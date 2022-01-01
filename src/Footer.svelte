<script>
    import Links from "./Links.svelte";
</script>

<footer>
    <nav>
        <Links />
    </nav>
    </footer>

<style>
    nav {
        z-index: 999;
        width: 100%;
        max-width: 1000px;
        padding-top: 100px;
    }
    footer {
        position: relative;
        width: 100vw;
        bottom: 0;
        left: 0;
        /* Should be approx as high as the hills SVG */
        height: 200px;
    }
</style>
