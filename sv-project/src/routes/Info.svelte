<script>
    import { onMount } from "svelte";
    import {img_url} from "../store";
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    setTimeout(() => {
        document.getElementById("container").className += ' on';
        document.getElementById("TT").className += ' on';
    }, 300);
    
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">Info</h1>
    <div class="img_wrap">
        <img src="{$img_url}img01.jpg" alt="" />
        <img src="{$img_url}img02.jpg" alt="" class="over_img" id="TT"/>
    </div>
    <h1 class="d1_title">Weight</h1>
    <p>12344</p>
</div>


<style>
p{color:red;}

</style>