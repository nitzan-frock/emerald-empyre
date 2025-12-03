<script lang="ts">
    interface Props {
        itemCount: number;
        autoPlay?: boolean;
        autoPlayDelay?: number;
        ariaLabel?: string;
        emptyMessage?: string;
        content: import("svelte").Snippet<[number, boolean]>;
    }

    let {
        itemCount,
        autoPlay = false,
        autoPlayDelay = 5000,
        ariaLabel = "Slideshow",
        emptyMessage = "No items to display",
        content,
    }: Props = $props();

    let currentIndex = $state(0);
    let touchStartX = $state(0);
    let touchEndX = $state(0);
    let isTransitioning = $state(false);
    let autoPlayInterval: ReturnType<typeof setInterval> | null = $state(null);

    // Minimum swipe distance (in pixels) to trigger navigation
    const SWIPE_THRESHOLD = 50;

    // Navigate to next item
    function nextItem(userInitiated = false) {
        if (isTransitioning || itemCount === 0) return;
        if (userInitiated) clearAutoPlay();
        isTransitioning = true;
        currentIndex = (currentIndex + 1) % itemCount;
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }

    // Navigate to previous item
    function previousItem(userInitiated = false) {
        if (isTransitioning || itemCount === 0) return;
        if (userInitiated) clearAutoPlay();
        isTransitioning = true;
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }

    // Navigate to specific item
    function goToItem(index: number) {
        if (isTransitioning || index === currentIndex || itemCount === 0)
            return;
        clearAutoPlay();
        isTransitioning = true;
        currentIndex = index;
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }

    // Touch event handlers for swipe gestures
    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e: TouchEvent) {
        touchEndX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (!touchStartX || !touchEndX) return;

        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
            if (swipeDistance > 0) {
                // Swipe left - next item
                nextItem(true);
            } else {
                // Swipe right - previous item
                previousItem(true);
            }
        }

        // Reset touch values
        touchStartX = 0;
        touchEndX = 0;
    }

    // Keyboard navigation
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            previousItem(true);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            nextItem(true);
        }
    }

    // Setup auto-play
    function setupAutoPlay() {
        if (autoPlay && itemCount > 1) {
            autoPlayInterval = setInterval(() => {
                nextItem();
            }, autoPlayDelay);
        }
    }

    function clearAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Initialize auto-play on mount and when props change
    $effect(() => {
        clearAutoPlay();
        if (autoPlay && itemCount > 1) {
            setupAutoPlay();
        }

        return () => {
            clearAutoPlay();
        };
    });

    // Focus management for keyboard navigation
    let slideshowContainer: HTMLDivElement;
    let hasFocus = $state(false);

    function handleFocus() {
        hasFocus = true;
    }

    function handleBlur() {
        hasFocus = false;
    }
</script>

{#if itemCount === 0}
    <div class="flex items-center justify-center h-64 text-gray-400">
        <p>{emptyMessage}</p>
    </div>
{:else}
    <div
        bind:this={slideshowContainer}
        class="relative w-full max-w-4xl mx-auto"
        tabindex="0"
        onkeydown={handleKeyDown}
        onfocus={handleFocus}
        onblur={handleBlur}
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
        role="region"
        aria-label={ariaLabel}
    >
        <!-- Main content container -->
        <div
            class="relative w-full aspect-video bg-black/50 rounded-lg overflow-hidden"
        >
            <!-- Content slot - receives currentIndex and isTransitioning -->
            {@render content(currentIndex, isTransitioning)}

            <!-- Navigation arrows -->
            {#if itemCount > 1}
                <!-- Previous button -->
                <button
                    type="button"
                    onclick={() => previousItem(true)}
                    class="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-emerald-400 hover:text-emerald-300 rounded-full p-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Previous item"
                >
                    <svg
                        class="w-6 h-6 md:w-8 md:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <!-- Next button -->
                <button
                    type="button"
                    onclick={() => nextItem(true)}
                    class="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-emerald-400 hover:text-emerald-300 rounded-full p-2 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Next item"
                >
                    <svg
                        class="w-6 h-6 md:w-8 md:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            {/if}
        </div>

        <!-- Dot indicators -->
        {#if itemCount > 1}
            <div
                class="flex justify-center items-center gap-2 mt-4"
                role="tablist"
                aria-label="Item indicators"
            >
                {#each Array(itemCount) as _, index}
                    <button
                        type="button"
                        onclick={() => goToItem(index)}
                        class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black {currentIndex ===
                        index
                            ? 'bg-emerald-400 scale-125'
                            : 'bg-gray-600 hover:bg-gray-500'}"
                        role="tab"
                        aria-selected={currentIndex === index}
                        aria-label={`Go to item ${index + 1}`}
                    />
                {/each}
            </div>
        {/if}

        <!-- Counter -->
        {#if itemCount > 1}
            <div class="text-center mt-2 text-gray-400 text-sm">
                <span class="text-emerald-400">{currentIndex + 1}</span>
                <span class="mx-1">/</span>
                <span>{itemCount}</span>
            </div>
        {/if}
    </div>
{/if}

<style>
    /* Ensure focus styles work properly */
    div[tabindex="0"]:focus {
        outline: none;
    }
</style>
