<script>
	import { onMount, onDestroy, beforeUpdate, afterUpdate, tick } from 'svelte'
	import Router from 'svelte-spa-router'
 	import routes from './routes'
	afterUpdate(async() => {
    })
</script>
<audio src="https://ssl.nexon.com/s2/Game/Maplestory/maple2013/mp3/FloralLife.mp3" controls></audio>
<Router {routes} />
<style>
	audio{height:30px; position:fixed; left:50%; top:10px; z-index:1000; transform:translateX(-50%);}
</style>
