export interface IShape {
    // Core properties
    readonly center: number;
    readonly primeSize: number;
    readonly strokeColor: string;
    readonly strokeWidth: number;

    // Rendering methods
    renderShapes(count: number, spacing: number, direction: string): string;
    renderFills(count: number, spacing: number, direction: string): string;
    renderPrimeFill(): string;

    // Mask generation
    generateMaskSvg(): string;

    // Utility methods
    getTrianglePoints(centerX: number, centerY: number, size: number): string;
}
