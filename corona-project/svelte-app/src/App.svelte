<script>
	import Router from "svelte-spa-router";
	import Header from "./include/Header.svelte";
	import routes from "./routers"
</script>
<main>
	<Header />
	<Router {routes} />
</main>

<style>
</style>