<script lang="ts">
    import { ShapeFactory, type ShapeType } from "./shapes/ShapeFactory";

    // Props using Svelte 5 runes
    let {
        shape = "square" as ShapeType,
        strokeColor = "rgb(16, 185, 129)",
        strokeWidth = 3,
        size = 25,
        maskId = undefined as string | undefined,
        rotation = undefined as number | undefined,
    } = $props();

    // Calculate center position (assuming 100x100 viewBox)
    const center = 50;

    // Create renderer for the mask
    const renderer = $derived(
        ShapeFactory.createRenderer(shape, {
            center,
            strokeColor,
            strokeWidth,
            rotation,
        }),
    );

    // Generate mask SVG using the renderer
    const maskSvg = $derived(renderer.generateMaskSvg(size));
    const finalMaskId = $derived(
        maskId || `mask-${Math.random().toString(36).slice(2, 11)}`,
    );

    // Debug logging
    console.log(`MaskLayer ${shape}: size=${size}, maskId=${finalMaskId}`);
    console.log(`Mask SVG:`, maskSvg);
</script>

<!-- Create mask definition only (no children in flat rendering) -->
<defs>
    <mask id={finalMaskId}>
        <!-- Black background makes everything invisible -->
        <rect width="100" height="100" fill="black" />
        <!-- White shape creates the "hole" (visible area) -->
        {@html maskSvg}
    </mask>
</defs>
