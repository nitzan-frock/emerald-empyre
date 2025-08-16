<script>
    import LayerdDimensions from "../LayerdDimensions.svelte";
</script>

<section
    id="home"
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
>
    <LayerdDimensions />

    <!-- Dark gradient overlay to ensure text readability -->
    <div
        class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70"
    ></div>

    <div class="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <!-- Band Logo - Hero Size -->
        <div class="mb-12">
            <img
                src="/ee-air.png"
                alt="Emerald Empyre Logo"
                class="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem] mx-auto object-contain filter brightness-110 contrast-110 drop-shadow-2xl"
            />
        </div>

        <!-- Band Info -->
        <div class="mb-8">
            <p class="text-xl md:text-2xl text-emerald-300 font-medium mb-2">
                Alternative Rock
            </p>
            <p class="text-lg md:text-xl text-gray-300 font-light">
                Las Vegas, NV
            </p>
        </div>

        <p
            class="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
            Alternative Rock from Las Vegas, NV. We're a 5 piece band that looks
            to make music that is both expressive and thought provoking.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button class="btn-primary text-lg px-10 py-4"> Listen Now </button>
            <button class="btn-secondary text-lg px-10 py-4">
                View Shows
            </button>
        </div>
    </div>
</section>
