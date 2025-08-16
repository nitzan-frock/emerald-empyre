// SVG Layer Components
export { default as SvgContainer } from './SvgContainer.svelte';
export { default as GeometricLayer } from './GeometricLayer.svelte';
export { default as MaskLayer } from './MaskLayer.svelte';

// Shape Classes and Types
export { ShapeFactory, type ShapeType } from './shapes/ShapeFactory';
export type { IShape } from './shapes/ShapeInterface';
export { CircleShape } from './shapes/CircleShape';
export { SquareShape } from './shapes/SquareShape';
export { TriangleShape } from './shapes/TriangleShape';
