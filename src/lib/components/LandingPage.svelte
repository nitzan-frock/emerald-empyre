<script lang="ts">
    const YOUTUBE_VIDEO_ID = "9g1q2VleLHE";
    const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`;
</script>

<section
    id="home"
    class="min-h-screen relative overflow-hidden bg-black flex items-center justify-center"
>
    <div
        class="relative z-20 w-full max-w-7xl mx-auto p-4 flex flex-col items-center justify-center"
    >
        <!-- Logo -->
        <div class="mb-6">
            <img
                src="/ee-air.png"
                alt="Emerald Empyre Logo"
                class="w-full max-w-[300px] md:max-w-[400px] h-auto mx-auto object-contain filter brightness-110 contrast-110 drop-shadow-2xl"
            />
        </div>

        <!-- YouTube Video Embed -->
        <div
            class="w-full max-w-4xl aspect-video mb-6 rounded-lg overflow-hidden shadow-2xl"
        >
            <iframe
                src={YOUTUBE_EMBED_URL}
                title="Emerald Empyre Music Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full"
            ></iframe>
        </div>
    </div>
</section>
