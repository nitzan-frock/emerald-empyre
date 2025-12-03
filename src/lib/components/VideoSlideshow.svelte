<script lang="ts">
    import Slideshow from "./Slideshow.svelte";

    interface Props {
        videos: string[]; // Array of YouTube video IDs or URLs
        autoPlay?: boolean;
        autoPlayDelay?: number;
    }

    let { videos, autoPlay = false, autoPlayDelay = 5000 }: Props = $props();

    // Extract YouTube video ID from URL or use as-is if already an ID
    function extractVideoId(video: string): string {
        // If it's already just an ID (no slashes or special chars), return as-is
        if (!video.includes("/") && !video.includes("?")) {
            return video;
        }

        // Extract ID from various YouTube URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/, // Direct ID format
        ];

        for (const pattern of patterns) {
            const match = video.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }

        return video; // Fallback to original if no match
    }

    // Get embed URL for a video
    function getVideoEmbedUrl(index: number): string {
        const video = videos[index];
        if (!video) return "";
        const videoId = extractVideoId(video);
        return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : "";
    }
</script>

{#snippet content(currentIndex: number, isTransitioning: boolean)}
    {@const embedUrl = getVideoEmbedUrl(currentIndex)}
    {#key currentIndex}
        {#if embedUrl}
            <iframe
                src={embedUrl}
                title={`Video ${currentIndex + 1} of ${videos.length}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full transition-opacity duration-300 {isTransitioning
                    ? 'opacity-70'
                    : 'opacity-100'}"
            ></iframe>
        {/if}
    {/key}
{/snippet}

<Slideshow
    itemCount={videos.length}
    {autoPlay}
    {autoPlayDelay}
    ariaLabel="Video slideshow"
    emptyMessage="No videos to display"
    {content}
/>
