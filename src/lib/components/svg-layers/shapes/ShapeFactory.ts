import { CircleShapeCalculator } from './CircleShapeCalculator';
import { SquareShapeCalculator } from './SquareShapeCalculator';
import { TriangleShapeCalculator } from './TriangleShapeCalculator';
import type { ConcentricDiameters, ShapeCalculationInput } from './ShapeCalculator';
import {
  CircleShapeRenderer,
  SquareShapeRenderer,
  TriangleShapeRenderer
} from './ShapeRenderer';

/** Supported geometric shape types */
export type ShapeType = 'circle' | 'square' | 'triangle';

/** Common shape properties for rendering */
export type Shape = {
  /** Center position of the shape */
  center: number;
  /** Stroke color */
  strokeColor: string;
  /** Stroke width */
  strokeWidth: number;
  /** Rotation in degrees around the center point */
  rotation?: number;
}

/** Union type of all shape calculators */
export type ShapeCalculator = CircleShapeCalculator | SquareShapeCalculator | TriangleShapeCalculator;

/** Union type of all shape renderers */
export type ShapeRenderer = CircleShapeRenderer | SquareShapeRenderer | TriangleShapeRenderer;

/**
 * Factory for creating shape calculators and renderers
 */
export class ShapeFactory {
  /**
   * Create a shape calculator for the given shape type and properties
   */
  static createCalculator(
    type: ShapeType,
    layer: ShapeCalculationInput
  ): ShapeCalculator {
    switch (type) {
      case 'circle':
        return new CircleShapeCalculator(layer);
      case 'square':
        return new SquareShapeCalculator(layer);
      case 'triangle':
        return new TriangleShapeCalculator(layer);
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }

  /**
   * Create a shape renderer for the given shape type and properties
   */
  static createRenderer(
    type: ShapeType,
    shape: Shape
  ): ShapeRenderer {
    switch (type) {
      case 'circle':
        return new CircleShapeRenderer(shape);
      case 'square':
        return new SquareShapeRenderer(shape);
      case 'triangle':
        return new TriangleShapeRenderer(shape);
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }
}
