<script lang="ts">
    interface Props {
        id: string;
        title: string;
    }

    let {
        id,
        title,
        children,
    }: Props & { children: import("svelte").Snippet } = $props();
</script>

<section {id} class="relative overflow-hidden scroll-mt-20">
    <div class="absolute inset-0 z-10 pointer-events-none"></div>
    <div class="relative z-20 w-full bg-black/70 p-3 py-20">
        <div class="text-center mb-8">
            <h2 class="text-4xl font-display text-gradient mb-4">
                {title}
            </h2>
        </div>
        {@render children()}
    </div>
</section>
