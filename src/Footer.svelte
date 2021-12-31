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
        position: absolute;
        z-index: 999;
        width: 100%;
        max-width: 1000px;
        bottom: 2rem;
    }
    footer {
        position: absolute;
        width: 100vw;
        bottom: 0;
        left: 0;
    }
</style>
