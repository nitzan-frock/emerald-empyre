<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Emerald Empyre</title>
  <meta name="description" content="Geometric soundscapes that evoke depth and infinity" />
</svelte:head>

<slot />
