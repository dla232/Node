<script>
    import {link,location} from 'svelte-spa-router'
    import {img_url} from "../store";
    import active from 'svelte-spa-router/active';
    
    let color = "#40dc88";
    let cl = "";
    let src = $img_url+"visual01.jpg";
    if( $location === "/"){
        color = "#40dc88";
        cl = "mn";
        src = $img_url+"visual01.jpg";
    }else if($location === "/about"){
        color = "plum";
        cl = "ab";
        src = $img_url+"visual02.jpg";
    }else if($location === "/info"){
        color = "#40dc88";
        cl = "if";
        src = $img_url+"visual03.jpg";
    }else if($location === "/canvas"){
        color = "#40dc00";
        cl = "if";
        src = $img_url+"visual02.jpg";

    }
    setTimeout(() => {
        document.getElementById("header_wrap").className += cl;
        // document.getElementById("header_wrap").style.backgroundColor = color;
    }, 0);
</script>

<header id="header_wrap" >
    <!--     
    {#if $location === "/"}
    메인
    {:else if $location === "/about"}
    정보페이지
    {:else if $location === "/info"}
    Info페이지
    {:else}
    오류 없는 페이지
    {/if} 
    -->
    <h1 class="logo"><a href="/">IM SEOL</a></h1>
    <div class="center_wrap">
        
        <ul class="gnb_list">
            <li><a href="/" use:link use:active>Home</a></li>
            <li><a href="/about" use:link use:active>About</a></li>
            <li><a href="/info" use:link use:active>Info</a></li>
            <li><a href="/Canvas" use:link use:active>Canvas</a></li>
        </ul>
    </div>
</header>
<div class="visual_wrap">
    <img src="{src}" alt="">
</div>
<style>
    .visual_wrap{width:100%; height:745px; position:relative; float:left; overflow:hidden;}
</style>