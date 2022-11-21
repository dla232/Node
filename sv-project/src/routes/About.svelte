<script>
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    setTimeout(() => {
        document.getElementById("container").className += ' on';
    }, 0);
    var a = "쪽";
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">About</h1>
    <dl>
        <dd>Name : 임설</dd>
        <dd>BirthDay : 2018.02.22</dd>
        <dd>Time : 12:32</dd>
        <dd>Father : 임관혁</dd>
        <dd>Weight : 2.48Kg</dd>
        <dd>Star : </dd>
    </dl>
</div>
<style>
    dl{width:100%; float:left; height:500px;}
    dl dd{font-size:16px;}
</style>