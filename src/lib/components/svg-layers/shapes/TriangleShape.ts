import type { IShape } from './ShapeInterface';

export class TriangleShape implements IShape {
  constructor(
    public readonly center: number,
    public readonly primeSize: number,
    public readonly strokeColor: string,
    public readonly strokeWidth: number
  ) { }

  generateOutwardShapes(count: number, spacing: number): number[] {
    return Array.from({ length: count }, (_, i) => this.primeSize + i * spacing);
  }

  generateInwardShapes(count: number, spacing: number): number[] {
    return Array.from({ length: count }, (_, i) => this.primeSize - i * spacing)
      .filter((size) => size > 0);
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

  private renderTriangle(size: number, isFill: boolean = false): string {
    const fill = isFill ? 'rgba(0, 0, 0, 1)' : 'none';
    const stroke = isFill ? 'none' : this.strokeColor;
    const strokeWidth = isFill ? '0' : this.strokeWidth.toString();

    return `<polygon points="${this.getTrianglePoints(this.center, this.center, size)}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
  }

  renderShapes(count: number, spacing: number, direction: string): string {
    return this.generateSizes(count, spacing, direction)
      .reduce((acc, size) => acc + this.renderTriangle(size, false), '');
  }

  renderFills(count: number, spacing: number, direction: string): string {
    return this.generateSizes(count, spacing, direction)
      .slice(1) // Skip the prime shape for fills
      .reduce((acc, size) => acc + this.renderTriangle(size, true), '');
  }

  renderPrimeFill(): string {
    // Prime triangle fill (no mask applied)
    return `<polygon points="${this.getTrianglePoints(this.center, this.center, this.primeSize)}" fill="rgba(0, 0, 0, 1)" />`;
  }

  generateMaskSvg(): string {
    return `<polygon points="${this.getTrianglePoints(this.center, this.center, this.primeSize)}" fill="white" />`;
  }

  getTrianglePoints(centerX: number, centerY: number, size: number): string {
    const height = (size * Math.sqrt(3)) / 2;
    const top = centerY - height / 2;
    const bottom = centerY + height / 2;
    const left = centerX - size / 2;
    const right = centerX + size / 2;
    return `${centerX},${top} ${left},${bottom} ${right},${bottom}`;
  }
}
