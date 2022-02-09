<script>
    import { onMount } from "svelte";
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    setTimeout(() => {
        document.getElementById("container").className += ' on';
    }, 0);
    
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">Info</h1>
</div>
