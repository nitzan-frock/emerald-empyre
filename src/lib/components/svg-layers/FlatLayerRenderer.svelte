<script lang="ts">
    import { GeometricLayer, MaskLayer } from "./index";
    import type { FlatLayerItem } from "./types";

    // Props using Svelte 5 runes
    let { layers }: { layers: FlatLayerItem[] } = $props();
</script>

{#if layers.length === 0}
    <!-- No layers to render -->
{:else}
    <!-- Render all layers and masks as flat siblings -->
    {#each layers as layer (layer.id)}
        {#if layer.type === "geometric"}
            <!-- Render geometric layer -->
            <GeometricLayer {layer} />
        {:else if layer.type === "mask"}
            <!-- Render mask definition -->
            {@const debugInfo = `MaskLayer ${layer.shape}: size=${layer.size}`}
            {console.log(debugInfo)}
            <MaskLayer
                shape={layer.shape}
                strokeColor={layer.strokeColor}
                strokeWidth={layer.strokeWidth}
                size={layer.size}
                maskId={layer.id}
                rotation={layer.rotation}
            />
        {/if}
    {/each}
{/if}
