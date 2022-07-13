<script>
    import { onMount } from "svelte";
    import {img_url} from "../store";
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
    <p>설이 사진</p>
    <div>
        <img src="{$img_url}img01.jpg" alt="">
        <img src="{$img_url}img02.jpg" alt="">
    </div>
</div>
