<script lang="ts">
    /**
     * This component is used to create a geometric layer.
     * layers can live within layers.
     *
     * These can be hierarchical so that layers can have masks.
     *
     * the mask layer should take the shape of whichever the "prime" size of the geometric layer is.
     * the mask acts as a window into the next child geometric layer.
     *
     * these layers need to stack.
     *
     * for example:
     *  <GeometricLayer shape="square">
     *      <MaskLayer shape="square">
     *          <GeometricLayer shape="circle" direction="both" />
     *      </MaskLayer>
     *  </GeometricLayer>
     */
    import { ShapeFactory, type ShapeType } from "./shapes/ShapeFactory";
    import type { IShape } from "./shapes/ShapeInterface";

    // Props using Svelte 5 runes
    let {
        shape = "circle" as ShapeType,
        primeSize = 25,
        spacing = 6.25,
        count = 7,
        strokeColor = "rgb(16, 185, 129)",
        strokeWidth = 3,
        centerFill = false,
        direction = "outward", // 'outward', 'inward', or 'both'
        layerIndex = 0,
        children = undefined,
    } = $props();

    // Calculate center position (assuming 100x100 viewBox)
    const center = 50;

    // Create shape instance using $derived
    const shapeInstance = $derived(
        ShapeFactory.createShape(
            shape,
            center,
            primeSize,
            strokeColor,
            strokeWidth,
        ),
    );

    // Generate SVG content using $derived
    const strokesSvg = $derived(
        shapeInstance.renderShapes(count, spacing, direction),
    );
    const primeFillSvg = $derived(shapeInstance.renderPrimeFill());

    // Generate mask for this layer if needed using $derived
    const layerMaskId = $derived(
        `layer-mask-${layerIndex}-${Math.random().toString(36).slice(2, 11)}`,
    );
    const maskSvg = $derived(shapeInstance.generateMaskSvg());
</script>

<!-- Render as SVG elements only -->
{@html strokesSvg}
{#if centerFill}
    {@html primeFillSvg}
{/if}
{@render children?.()}
