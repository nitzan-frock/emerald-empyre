import type { ShapeType } from "./shapes/ShapeFactory";

/**
 * Base shape properties shared across configurations
 */
export interface BaseShapeProperties {
    /** The geometric shape type */
    shape: ShapeType;
    /** Spacing between concentric shapes */
    spacing: number;
    /** Number of additional shapes to generate */
    count: number;
    /** Stroke color for the shapes */
    strokeColor: string;
    /** Stroke width for the shapes */
    strokeWidth: number;
    /** Direction to generate additional shapes */
    direction: "outward" | "inward" | "both";
    /** Whether to fill the center shape */
    centerFill?: boolean;
    /** Rotation in degrees around the center point */
    rotation?: number;
}

/**
 * Configuration for a single layer in the SVG composition
 */
export interface LayerConfig extends BaseShapeProperties { }

/**
 * Runtime properties added during layer processing
 */
export interface LayerRuntimeProperties {
    /** Unique identifier for this layer */
    id: string;
    /** Type of layer - geometric shape or mask */
    type: "geometric" | "mask";
    /** Index of this layer in the original configuration */
    layerIndex: number;
    /** Size (diameter) of the shape */
    size: number;
    /** ID of the mask to apply to this layer */
    maskId?: string;
    /** ID of the layer this mask targets (for mask items) */
    targetLayerId?: string;
}

/**
 * A flattened layer item that can be rendered directly
 */
export interface FlatLayerItem extends BaseShapeProperties, LayerRuntimeProperties { }

/**
 * Function to calculate flat layers from layer configuration
 */
export type CalculateFlatLayersFn = (layers: LayerConfig[], startingSize: number) => FlatLayerItem[];
