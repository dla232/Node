<script>
    import { onMount } from "svelte";
    import {img_url} from "../store";
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    
    onMount(() => {
        setTimeout(() => {
            document.getElementById("container").className += ' on';
            document.getElementById("TT").className += ' on';
        }, 300);
        setTimeout(() => {
            jQuery(".df_img").remove();
            jQuery(".over_img").css({"width":"50%","transition":"all 0.5s ease"});
            jQuery(".info_txt").fadeIn(500);
        },4300);
    });
        
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">Info</h1>
    <div class="img_wrap">
        <img src="{$img_url}img01.jpg" alt="" class="df_img"/>
        <img src="{$img_url}img02.jpg" alt="" class="over_img" id="TT"/>
        <div class="info_txt">
            <dl>
                <dt>이름 : 임관혁</dt>
                <dd>1</dd>
                <dd>2</dd>
            </dl>
        </div>
        
    </div>
    <div class="ef_img">
        <ul>
            <li><img src="{$img_url}visual01.jpg" alt=""></li>
            <li><img src="{$img_url}visual02.jpg" alt=""></li>
            <li><img src="{$img_url}visual03.jpg" alt=""></li>
        </ul>
    </div>
    
</div>
<style>
p{color:red;}
.info_txt{width:50%; float:right; position:relative; display:none;}
.ef_img{width:100%; float:left; position:relative; height:500px; transform: rotate(-15deg);}
.ef_img ul{position:absolute; left:0; top:0; height:100%; width:10000%}
.ef_img ul li{float:left; height:100%; list-style: none;}
.ef_img ul li img{height:100%; float:left;}
</style>