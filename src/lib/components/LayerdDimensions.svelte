<script lang="ts">
    import { SvgContainer, GeometricLayer, MaskLayer } from "./svg-layers";

    // Shared coordinate system for all layers
    const viewBoxSize = 100;
    const containerSize = 300;
</script>

<div
    class="fixed inset-0 overflow-hidden pointer-events-none flex items-center justify-center"
>
    <!-- Single SVG container with all layers -->
    <SvgContainer {viewBoxSize} {containerSize}>
        <!-- Square Layer (background) -->
        <GeometricLayer
            shape="square"
            primeSize={30}
            spacing={9}
            count={3}
            strokeColor="white"
            strokeWidth={3}
            direction="outward"
            layerIndex={0}
        />

        <!-- Circle Layer (without mask for now) -->
        <GeometricLayer
            shape="circle"
            primeSize={15}
            spacing={9}
            count={8}
            strokeColor="white"
            strokeWidth={3}
            direction="both"
            centerFill={false}
            layerIndex={2}
        />
    </SvgContainer>
</div>
