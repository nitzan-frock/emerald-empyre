import type { IShape } from './ShapeInterface';
import { CircleShape } from './CircleShape';
import { SquareShape } from './SquareShape';
import { TriangleShape } from './TriangleShape';

export type ShapeType = 'circle' | 'square' | 'triangle';

export class ShapeFactory {
  static createShape(
    type: ShapeType,
    center: number,
    primeSize: number,
    strokeColor: string,
    strokeWidth: number
  ): IShape {
    switch (type) {
      case 'circle':
        return new CircleShape(center, primeSize, strokeColor, strokeWidth);
      case 'square':
        return new SquareShape(center, primeSize, strokeColor, strokeWidth);
      case 'triangle':
        return new TriangleShape(center, primeSize, strokeColor, strokeWidth);
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }
}
