<script lang="ts">
    // Props for the container using Svelte 5 runes
    let {
        viewBoxSize = 100,
        containerSize = 300,
        children = undefined,
    } = $props();
</script>

<div class="absolute">
    <svg
        viewBox="0 0 {viewBoxSize} {viewBoxSize}"
        width={containerSize}
        height={containerSize}
        class="w-full h-full"
    >
        <!-- Render all layers -->
        {@render children?.()}
    </svg>
</div>
