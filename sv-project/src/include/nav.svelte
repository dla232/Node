<script>
    import {link} from "svelte-spa-router";
    import active from 'svelte-spa-router/active';
    let nav_list=[
        {
            url : "/",
            path : "Home",
        },
        {
            url : "/about",
            path : "About",
        },
        {
            url : "/info",
            path : "Info",
        }
    ];
</script>
<style>
nav{width:150px; position:fixed; left:0; top:0; height:100%; background-color:plum;}
nav ul{width:100%; float:left; margin-top:50px;}
nav ul li{width:100%; float:left; border-bottom:1px solid #fff; text-align: center; line-height:50px;}
nav ul li a{color:#fff;}
</style>
<nav>
    <ul class="lnb">
        {#each nav_list as item}
        <li>
            <a href="{item.url}" use:link use:active>{item.path}</a>
        </li>
        {/each}
    </ul>
</nav>