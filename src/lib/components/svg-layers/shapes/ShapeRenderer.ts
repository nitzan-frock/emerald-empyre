import type { ConcentricDiameters } from './ShapeCalculator';

import type { Shape } from './ShapeFactory';

export abstract class ShapeRenderer {
    constructor(protected readonly shape: Shape) { }

    /**
     * Render all shapes based on the calculation
     */
    renderShapes(calculation: ConcentricDiameters): string {
        return calculation.all
            .reduce((acc: string, size: number, index: number) => acc + this.renderShape(size, index), '');
    }

    /**
     * Render a single shape at the given size
     */
    protected abstract renderShape(size: number, index: number): string;

    /**
     * Render the prime fill (center shape)
     */
    abstract renderPrimeFill(primeSize: number): string;

    /**
     * Generate mask SVG
     */
    abstract generateMaskSvg(primeSize: number): string;
}

export class CircleShapeRenderer extends ShapeRenderer {
    protected renderShape(size: number, index: number = 0): string {
        const fill = 'none';
        const stroke = this.shape.strokeColor;
        const strokeWidth = this.shape.strokeWidth;
        const className = index === 0 ? 'drop-shadow-lg' : '';
        const radius = size / 2;

        return `<circle cx="${this.shape.center}" cy="${this.shape.center}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" class="${className}" />`;
    }

    renderPrimeFill(primeSize: number): string {
        const radius = primeSize / 2;
        return `<circle cx="${this.shape.center}" cy="${this.shape.center}" r="${radius}" fill="${this.shape.strokeColor}" />`;
    }

    generateMaskSvg(primeSize: number): string {
        const radius = primeSize / 2;
        return `<circle cx="${this.shape.center}" cy="${this.shape.center}" r="${radius}" fill="white" />`;
    }
}

export class SquareShapeRenderer extends ShapeRenderer {
    protected renderShape(size: number, index: number = 0): string {
        const fill = 'none';
        const stroke = this.shape.strokeColor;
        const strokeWidth = this.shape.strokeWidth;
        const rotation = this.shape.rotation || 0;

        if (rotation === 0) {
            // No rotation - use simple rect for better performance
            const position = this.shape.center - size / 2;
            return `<rect x="${position}" y="${position}" width="${size}" height="${size}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
        } else {
            // With rotation - use polygon for rotated square
            const points = this.getSquarePoints(this.shape.center, this.shape.center, size, rotation);
            return `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
        }
    }

    renderPrimeFill(primeSize: number): string {
        const rotation = this.shape.rotation || 0;

        if (rotation === 0) {
            const position = this.shape.center - primeSize / 2;
            return `<rect x="${position}" y="${position}" width="${primeSize}" height="${primeSize}" fill="rgba(0, 0, 0, 0)" />`;
        } else {
            const points = this.getSquarePoints(this.shape.center, this.shape.center, primeSize, rotation);
            return `<polygon points="${points}" fill="rgba(0, 0, 0, 0)" />`;
        }
    }

    generateMaskSvg(primeSize: number): string {
        const rotation = this.shape.rotation || 0;

        if (rotation === 0) {
            const position = this.shape.center - primeSize / 2;
            return `<rect x="${position}" y="${position}" width="${primeSize}" height="${primeSize}" fill="white" />`;
        } else {
            const points = this.getSquarePoints(this.shape.center, this.shape.center, primeSize, rotation);
            return `<polygon points="${points}" fill="white" />`;
        }
    }

    private getSquarePoints(centerX: number, centerY: number, size: number, rotationDegrees: number): string {
        const halfSize = size / 2;
        const rotationRadians = (rotationDegrees * Math.PI) / 180;

        // Square corners relative to center
        const corners = [
            [-halfSize, -halfSize], // top-left
            [halfSize, -halfSize],  // top-right
            [halfSize, halfSize],   // bottom-right
            [-halfSize, halfSize]   // bottom-left
        ];

        // Rotate and translate each corner
        const rotatedCorners = corners.map(([x, y]) => {
            const rotatedX = x * Math.cos(rotationRadians) - y * Math.sin(rotationRadians);
            const rotatedY = x * Math.sin(rotationRadians) + y * Math.cos(rotationRadians);
            return [centerX + rotatedX, centerY + rotatedY];
        });

        return rotatedCorners.map(([x, y]) => `${x},${y}`).join(' ');
    }
}

export class TriangleShapeRenderer extends ShapeRenderer {
    protected renderShape(size: number, index: number = 0): string {
        const fill = 'none';
        const stroke = this.shape.strokeColor;
        const strokeWidth = this.shape.strokeWidth;
        const rotation = this.shape.rotation || 0;

        return `<polygon points="${this.getTrianglePoints(this.shape.center, this.shape.center, size, rotation)}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    }

    renderPrimeFill(primeSize: number): string {
        const rotation = this.shape.rotation || 0;
        return `<polygon points="${this.getTrianglePoints(this.shape.center, this.shape.center, primeSize, rotation)}" fill="rgba(0, 0, 0, 1)" />`;
    }

    generateMaskSvg(primeSize: number): string {
        const rotation = this.shape.rotation || 0;
        return `<polygon points="${this.getTrianglePoints(this.shape.center, this.shape.center, primeSize, rotation)}" fill="white" />`;
    }

    private getTrianglePoints(centerX: number, centerY: number, size: number, rotationDegrees: number = 0): string {
        // For an equilateral triangle inscribed in a circle (circumcircle):
        // The circle radius = size/2 (this is the circumcircle radius)
        // The triangle vertices are at 0°, 120°, and 240° on the circle
        const radius = size / 2;
        const rotationRadians = (rotationDegrees * Math.PI) / 180;

        // Convert polar coordinates to Cartesian coordinates with rotation
        // Vertex 1: at 0° (top) + rotation
        const x1 = centerX + radius * Math.cos(-Math.PI / 2 + rotationRadians);
        const y1 = centerY + radius * Math.sin(-Math.PI / 2 + rotationRadians);

        // Vertex 2: at 120° (bottom left) + rotation
        const x2 = centerX + radius * Math.cos(-Math.PI / 2 + (2 * Math.PI / 3) + rotationRadians);
        const y2 = centerY + radius * Math.sin(-Math.PI / 2 + (2 * Math.PI / 3) + rotationRadians);

        // Vertex 3: at 240° (bottom right) + rotation
        const x3 = centerX + radius * Math.cos(-Math.PI / 2 + (4 * Math.PI / 3) + rotationRadians);
        const y3 = centerY + radius * Math.sin(-Math.PI / 2 + (4 * Math.PI / 3) + rotationRadians);

        return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
    }
}
