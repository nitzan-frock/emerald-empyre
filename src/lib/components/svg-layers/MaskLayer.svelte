<script lang="ts">
    import { ShapeFactory, type ShapeType } from "./shapes/ShapeFactory";
    import type { IShape } from "./shapes/ShapeInterface";

    // Props using Svelte 5 runes
    let {
        shape = "square" as ShapeType,
        primeSize = 25,
        strokeColor = "rgb(16, 185, 129)",
        strokeWidth = 3,
        parentMaskId = "", // Mask ID from parent GeometricLayer
        children = undefined,
    } = $props();

    // Calculate center position (assuming 100x100 viewBox)
    const center = 50;

    // Create shape instance for the mask using $derived
    const shapeInstance = $derived(
        ShapeFactory.createShape(
            shape,
            center,
            primeSize,
            strokeColor,
            strokeWidth,
        ),
    );
</script>

<!-- Apply mask to child content using parent's mask ID -->
<g mask={parentMaskId ? `url(#${parentMaskId})` : null}>
    {@render children?.()}
</g>
