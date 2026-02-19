<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import LayeredDimensions from "$lib/components/LayeredDimensions.svelte";
    import ImageSlideshow from "$lib/components/ImageSlideshow.svelte";
    import VideoSlideshow from "$lib/components/VideoSlideshow.svelte";
    import LandingPage from "$lib/components/LandingPage.svelte";
    import SimpleTable from "$lib/components/SimpleTable.svelte";
    import Section from "$lib/components/Section.svelte";
    import { getFutureEvents, formatEventDate } from "$lib/data/events";

    // Gallery images - user can populate this array with their image URLs
    const galleryImages: string[] = [
        "https://i.imgur.com/0pNY09j.jpeg",
        "https://i.imgur.com/k17tlqE.jpeg",
    ];

    // Media videos - user can populate this array with YouTube video IDs or URLs
    const mediaVideos: string[] = [
        "https://youtu.be/9g1q2VleLHE?si=dlamZTi4IbyqNgo_",
    ];

    // Get future events and format them for the table
    const futureEvents = getFutureEvents();
    const eventTableRows = futureEvents.map((event) => ({
        date: formatEventDate(event.date),
        location: event.locationUrl
            ? { text: event.location, url: event.locationUrl }
            : event.location,
        tickets: event.ticketUrl ? { url: event.ticketUrl } : undefined,
    }));

    const eventTableColumns = [
        { header: "Date", key: "date" },
        { header: "Location", key: "location" },
        { header: "Tickets", key: "tickets" },
    ];
</script>

<Navigation />
<main class="relative">
    <!-- Layer 3: Background design (bottom layer) -->
    <LayeredDimensions />

    <!-- Layer 1: Landing page and sections (content layer - top) -->
    <LandingPage />

    <div class="relative">
        <!-- About Section -->
        <Section id="about" title="About">
            <div class="max-w-4xl mx-auto px-4">
                <p class="text-gray-300 text-lg leading-relaxed text-center">
                    Emerald Empyre, hailing from Las Vegas, NV, is an
                    alternative rock band bringing raw energy and power to their
                    music and shows. Born from the neon-lit streets of Sin City,
                    they channel the electric pulse of the desert into their
                    sound to create soundscapes that evoke depth and infinity.
                </p>
            </div>
        </Section>

        <!-- Music Section with Spotify Embed -->
        <Section id="music" title="Music">
            <div class="max-w-4xl mx-auto px-4">
                <div class="w-full">
                    <iframe
                        src="https://open.spotify.com/embed/artist/19tIJDfoaplRz5FuSrOBsd?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        allowfullscreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Emerald Empyre on Spotify"
                        class="rounded-lg"
                    ></iframe>
                </div>
            </div>
        </Section>

        <!-- Events Section -->
        <Section id="events" title="Events">
            <div class="max-w-4xl mx-auto px-4">
                {#if eventTableRows.length > 0}
                    <div class="bg-black/70 rounded-lg p-4">
                        <SimpleTable
                            columns={eventTableColumns}
                            rows={eventTableRows}
                        />
                    </div>
                {:else}
                    <p class="text-gray-300 text-center">
                        No upcoming events scheduled.
                    </p>
                {/if}
            </div>
        </Section>

        <!-- Media Section for Videos -->
        <Section id="media" title="Media">
            <div class="max-w-6xl mx-auto px-4">
                <VideoSlideshow videos={mediaVideos} />
            </div>
        </Section>

        <!-- Gallery Section with Image Slideshow -->
        <Section id="gallery" title="Gallery">
            <div class="max-w-6xl mx-auto px-4">
                <ImageSlideshow images={galleryImages} />
            </div>
        </Section>

        <!-- Contact Section -->
        <Section id="contact" title="Contact">
            <div class="max-w-4xl mx-auto px-4">
                <p
                    class="text-gray-300 text-lg leading-relaxed mb-6 text-center"
                >
                    For booking or inquiries, please reach out to{" "}
                    <a
                        href="mailto:emeraldempyre@gmail.com"
                        class="text-emerald-400 hover:text-emerald-300 underline transition-colors"
                    >
                        emeraldempyre@gmail.com
                    </a>
                </p>
                <div class="flex justify-center items-center gap-4">
                    <a
                        href="https://www.instagram.com/emeraldempyre/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-emerald-400 hover:text-emerald-300 transition-colors"
                        aria-label="Follow Emerald Empyre on Instagram"
                    >
                        <svg
                            class="w-8 h-8 md:w-10 md:h-10"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </Section>
    </div>
</main>
