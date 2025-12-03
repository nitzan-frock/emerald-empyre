<script lang="ts">
    import Slideshow from "./Slideshow.svelte";

    interface Props {
        images: string[];
        autoPlay?: boolean;
        autoPlayDelay?: number;
    }

    let { images, autoPlay = false, autoPlayDelay = 5000 }: Props = $props();

    // Get current image
    function getCurrentImage(index: number): string {
        return images[index] || "";
    }
</script>

{#snippet content(currentIndex: number, isTransitioning: boolean)}
    {#if getCurrentImage(currentIndex)}
        <img
            src={getCurrentImage(currentIndex)}
            alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
            class="w-full h-full object-contain transition-opacity duration-300 {isTransitioning
                ? 'opacity-70'
                : 'opacity-100'}"
        />
    {/if}
{/snippet}

<Slideshow
    itemCount={images.length}
    {autoPlay}
    {autoPlayDelay}
    ariaLabel="Image slideshow"
    emptyMessage="No images to display"
    {content}
/>
