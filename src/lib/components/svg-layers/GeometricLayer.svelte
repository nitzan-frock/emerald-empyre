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
    import type { ConcentricDiameters } from "./shapes/ShapeCalculator";
    import type { FlatLayerItem } from "./types";

    // Props using Svelte 5 runes
    let { layer }: { layer: FlatLayerItem } = $props();

    // Calculate center position (assuming 100x100 viewBox)
    const center = 50;

    // Create calculator and calculate all sizes
    const calculator = $derived(
        ShapeFactory.createCalculator(layer.shape, {
            outer: layer.size,
            spacing: layer.spacing,
            count: layer.count,
            direction: layer.direction,
        }),
    );

    const concentricDiameters = $derived(calculator.calculateLayerDiameters());

    // Create renderer and generate SVG content
    const renderer = $derived(
        ShapeFactory.createRenderer(layer.shape, {
            center,
            strokeColor: layer.strokeColor,
            strokeWidth: layer.strokeWidth,
            rotation: layer.rotation,
        }),
    );

    const strokesSvg = $derived(renderer.renderShapes(concentricDiameters));
    const primeFillSvg = $derived(
        renderer.renderPrimeFill(concentricDiameters.outer),
    );

    // Use the calculated effective prime size
    const effectivePrimeSize = $derived(concentricDiameters.outer);
</script>

<!-- Render as SVG elements only -->
{#if layer.maskId}
    <g mask={`url(#${layer.maskId})`}>
        {@html strokesSvg}
        {#if layer.centerFill}
            {@html primeFillSvg}
        {/if}
    </g>
{:else}
    {@html strokesSvg}
    {#if layer.centerFill}
        {@html primeFillSvg}
    {/if}
{/if}
