import type { IShape } from './ShapeInterface';

export class SquareShape implements IShape {
    constructor(
        public readonly center: number,
        public readonly primeSize: number,
        public readonly strokeColor: string,
        public readonly strokeWidth: number
    ) { }

    public renderShapes(count: number, spacing: number, direction: string): string {
        return this.generateSizes(count, spacing, direction)
            .reduce((acc, size) => acc + this.renderRect(size, false), '');
    }

    public renderFills(count: number, spacing: number, direction: string): string {
        return this.generateSizes(count, spacing, direction)
            .reduce((acc, size) => acc + this.renderRect(size, true), '');
    }

    public renderPrimeFill(): string {
        // Prime square fill (no mask applied)
        return `<rect x="${this.center - this.primeSize / 2}" y="${this.center - this.primeSize / 2}" width="${this.primeSize}" height="${this.primeSize}" fill="rgba(0, 0, 0, 0)" />`;
    }

    public generateMaskSvg(): string {
        return `<rect x="${this.center - this.primeSize / 2}" y="${this.center - this.primeSize / 2}" width="${this.primeSize}" height="${this.primeSize}" fill="white" />`;
    }

    public getTrianglePoints(centerX: number, centerY: number, size: number): string {
        // Not used for squares, but required by interface
        return '';
    }

    private generateSizes(count: number, spacing: number, direction: string): number[] {
        const sizes: number[] = [];

        if (direction === 'outward' || direction === 'both') {
            sizes.push(...Array.from({ length: count }, (_, i) => this.primeSize + i * spacing));
        }

        if (direction === 'inward' || direction === 'both') {
            sizes.push(...Array.from({ length: count }, (_, i) => this.primeSize - i * spacing)
                .filter((size) => size > 0));
        }

        return sizes;
    }

    private renderRect(size: number, isFill: boolean = false): string {
        const position = this.center - size / 2;
        const fill = isFill ? 'rgba(0, 0, 0, 0)' : 'none'; // Transparent fills
        const stroke = isFill ? 'none' : `${this.strokeColor}`;
        const strokeWidth = isFill ? '0' : `${this.strokeWidth}`;

        return `<rect x="${position}" y="${position}" width="${size}" height="${size}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    }
}
