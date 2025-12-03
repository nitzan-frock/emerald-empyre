<script lang="ts">
    import { SvgContainer, FlatLayerRenderer } from "./svg-layers";
    import type {
        LayerConfig as GeoLayer,
        FlatLayerItem,
    } from "./svg-layers/types";
    import { calculateFlatLayers } from "./svg-layers/calculateFlatLayers";

    // Shared coordinate system for all layers
    const viewBoxSize = 100;
    const containerSize = 800;
    const strokeWidth = 0.5; // Increased from 0.5 to 2 for better visibility
    const startingDiameter = 90; // Starting diameter for the entire canvas
    const strokeColor = "lime";

    // Layer configuration array (outermost to innermost)
    // No need to specify primeSize - it will be calculated based on parent's effective size
    const geoLayers: GeoLayer[] = [
        {
            shape: "circle",
            spacing: 5,
            count: 0,
            strokeColor,
            strokeWidth: 0.5,
            direction: "outward",
        },
        {
            shape: "triangle",
            spacing: 4.5,
            count: 8,
            strokeColor,
            strokeWidth,
            direction: "outward",
            rotation: 180, // Rotate the square 45 degrees
        },
        {
            shape: "circle",
            spacing: 4,
            count: 8,
            strokeColor,
            strokeWidth,
            direction: "outward",
        },
        {
            shape: "square",
            spacing: 3.5,
            count: 5,
            strokeColor,
            strokeWidth: 0.5,
            direction: "outward",
            rotation: 0, // Rotate the triangle 30 degrees
        },
        {
            shape: "circle",
            spacing: 3,
            count: 5,
            strokeColor,
            strokeWidth: 0.5,
            direction: "outward",
        },
        {
            shape: "triangle",
            spacing: 2.5,
            count: 3,
            strokeColor,
            strokeWidth: 0.4,
            direction: "outward",
            rotation: 0, // Rotate the square 45 degrees
        },
        {
            shape: "circle",
            spacing: 2,
            count: 5,
            strokeColor,
            strokeWidth: 0.25,
            direction: "outward",
        },
        {
            shape: "square",
            spacing: 1,
            count: 0,
            strokeColor,
            strokeWidth: 0.2,
            direction: "outward",
            rotation: 0, // Rotate the triangle 30 degrees
        },
        {
            shape: "circle",
            spacing: 1,
            count: 2,
            strokeColor,
            strokeWidth: 0.2,
            direction: "both",
            centerFill: false,
        },
    ];

    // Calculate all layer data first (separate from rendering)
    const flatLayers = calculateFlatLayers(geoLayers, startingDiameter);

    // Debug: Log the current calculated values
    console.log("Current flat layers:", flatLayers);

    // Debug triangle calculations
    const greenCircleOuter = flatLayers.find((l) => l.id === "layer-0")?.size;
    const greenCircleInner = greenCircleOuter ? greenCircleOuter - 8 : 0;
    const redTriangleOuter = flatLayers.find((l) => l.id === "layer-1")?.size;
    const redTriangleInner = flatLayers.find((l) => l.id === "layer-1")?.size
        ? (flatLayers.find((l) => l.id === "layer-1")?.size || 0) / 2 - 8
        : 0;

    console.log("Green circle outer:", greenCircleOuter);
    console.log("Green circle inner:", greenCircleInner);
    console.log("Red triangle outer:", redTriangleOuter);
    console.log("Red triangle inner:", redTriangleInner);
    console.log(
        "Triangle side length should be:",
        (greenCircleInner * Math.sqrt(3)) / 2,
    );
</script>

<div
    class="fixed inset-0 overflow-hidden pointer-events-none flex items-center justify-center -z-10"
>
    <!-- Single SVG container with flat layers -->
    <SvgContainer {viewBoxSize} {containerSize}>
        <FlatLayerRenderer layers={flatLayers} />
    </SvgContainer>
</div>
