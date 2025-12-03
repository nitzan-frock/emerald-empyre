import type { LayerConfig, FlatLayerItem, CalculateFlatLayersFn } from "./types";
import { ShapeFactory } from "./shapes/ShapeFactory";
import type { ConcentricDiameters } from "./shapes/ShapeCalculator";

/**
 * Calculates a flat array of layers and masks that can be rendered in order
 * Each layer's size is calculated based on the parent's inner diameter
 */
export const calculateFlatLayers: CalculateFlatLayersFn = (layers, startingSize) => {
    if (layers.length === 0) return [];

    const flatItems: FlatLayerItem[] = [];
    // Use reduce to accumulate calculations
    const diameters = layers.reduce<ConcentricDiameters[]>((acc, layer, index) => {
        let primeDiameter: number;
        if (index === 0) {
            // First layer uses the starting size as its outer prime size
            primeDiameter = startingSize;
        } else {
            // Subsequent layers use the parent's inner prime size as their outer prime size
            const parent = acc[index - 1];
            const parentLayer = layers[index - 1];

            // Create a temporary shape instance to calculate the appropriate outer diameter
            const tempShape = ShapeFactory.createCalculator(
                layer.shape,
                {
                    outer: 0, // Will be calculated
                    spacing: layer.spacing,
                    count: layer.count,
                    direction: layer.direction,
                    parentShape: parentLayer.shape,
                    parentSpacing: parentLayer.spacing
                }
            );

            // Each layer should be calculated based on its immediate parent's inner diameter
            primeDiameter = tempShape.calculateOuterDiameter(parent.inner);
            console.log(`Calculating outer diameter for layer ${index} (${layer.shape}):`, {
                parentInner: parent.inner,
                calculatedOuter: primeDiameter,
                parentShape: parentLayer.shape
            });
        }

        // Create calculator and calculate all sizes for this layer
        const calculator = ShapeFactory.createCalculator(
            layer.shape,
            {
                outer: primeDiameter,
                spacing: layer.spacing,
                count: layer.count,
                direction: layer.direction,
                parentShape: index > 0 ? layers[index - 1].shape : undefined,
                parentSpacing: index > 0 ? layers[index - 1].spacing : undefined
            }
        );

        const diameters = calculator.calculateLayerDiameters();
        console.log(`Layer ${index} (${layer.shape}):`, {
            outer: diameters.outer,
            inner: diameters.inner,
            additional: diameters.additional,
            all: diameters.all
        });
        acc.push(diameters);

        return acc;
    }, []);

    // Second pass: create flat items with calculated sizes
    layers.forEach((layer, index) => {
        const diameter = diameters[index];
        const layerId = `layer-${index}`;
        const isLastLayer = index === layers.length - 1;

        // Debug logging for layer mask assignment
        const layerMaskId = index === 0 ? undefined : `mask-${index - 1}`;
        console.log(`🔧 LAYER ${index} (${layer.shape}): maskId=${layerMaskId}, count=${layer.count}`);

        // Add the geometric layer
        flatItems.push({
            id: layerId,
            type: "geometric",
            layerIndex: index,
            shape: layer.shape,
            size: diameter.outer,
            spacing: layer.spacing,
            count: layer.count,
            strokeColor: layer.strokeColor,
            strokeWidth: layer.strokeWidth,
            direction: layer.direction,
            centerFill: layer.centerFill,
            rotation: layer.rotation,
            // Each layer gets a maskId that will be applied to it (from the previous layer)
            // Special case: Square layers with count > 0 use their own square mask
            maskId: layerMaskId
        });

        // If not the last layer, add a mask that will be applied to the next layer
        if (!isLastLayer) {
            const maskId = `mask-${index}`;
            const nextLayerId = `layer-${index + 1}`;
            const nextLayer = layers[index + 1];

            // Calculate the effective mask size for the next layer
            // For triangles, circles, and squares, use inner diameter to create a hole that matches the inner shape
            let maskSize = diameter.inner;

            // All shapes should use inner diameter for proper masking
            console.log(`🔧 ${layer.shape.toUpperCase()} MASK: using inner diameter ${maskSize} for next layer`);
            console.log(`Creating mask for layer ${index} (${layer.shape}):`, {
                outer: diameter.outer,
                inner: diameter.inner,
                maskSize: maskSize,
                nextLayerShape: layers[index + 1]?.shape
            });

            flatItems.push({
                id: maskId,
                type: "mask",
                layerIndex: index,
                shape: layer.shape,
                // The mask should be based on the parent layer's effective prime size
                // This ensures the child layer is properly visible through the mask
                size: maskSize,
                spacing: layer.spacing,
                count: layer.count,
                strokeColor: layer.strokeColor,
                strokeWidth: layer.strokeWidth,
                direction: layer.direction,
                centerFill: layer.centerFill,
                // The mask should inherit the rotation from the current layer (the layer being masked)
                rotation: layer.rotation,
                targetLayerId: nextLayerId
            });
        }

    });

    return flatItems;
}
