<script>
    import Navigation from "$lib/components/Navigation.svelte";
    import Hero from "$lib/components/sections/Hero.svelte";
</script>

<Navigation />
<main>
    <Hero />

    <!-- Placeholder sections for now -->
    <section
        id="about"
        class="min-h-screen bg-emerald-950/10 flex items-center justify-center relative overflow-hidden"
    >
        <div class="text-center relative z-10">
            <h2 class="text-4xl font-display text-gradient mb-4">About</h2>
            <p class="text-gray-300">Coming soon - About section</p>
        </div>
    </section>

    <section
        id="music"
        class="min-h-screen bg-gradient-to-b from-emerald-950/10 to-black flex items-center justify-center"
    >
        <div class="text-center">
            <h2 class="text-4xl font-display text-gradient mb-4">Music</h2>
            <p class="text-gray-300">Coming soon - Music section</p>
        </div>
    </section>

    <section id="tours" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <h2 class="text-4xl font-display text-gradient mb-4">Tours</h2>
            <p class="text-gray-300">Coming soon - Tour dates</p>
        </div>
    </section>

    <section
        id="gallery"
        class="min-h-screen bg-emerald-950/10 flex items-center justify-center"
    >
        <div class="text-center">
            <h2 class="text-4xl font-display text-gradient mb-4">Gallery</h2>
            <p class="text-gray-300">Coming soon - Visual gallery</p>
        </div>
    </section>

    <section id="contact" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <h2 class="text-4xl font-display text-gradient mb-4">Contact</h2>
            <p class="text-gray-300">Coming soon - Contact information</p>
        </div>
    </section>
</main>
