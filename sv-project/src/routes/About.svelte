<script>
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    setTimeout(() => {
        document.getElementById("container").className += ' on';
    }, 0);
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">About</h1>
    <dl>
        <dt></dt>
        <dd>Name : 임설</dd>
        <dd>BirthDay : 2018.02.22</dd>
        <dd>Mother : 채경옥</dd>
        <dd>Father : 임관혁</dd>
        <dd></dd>
    </dl>
</div>

<style>

    dl{width:100%; float:left; height:500px;}
</style>