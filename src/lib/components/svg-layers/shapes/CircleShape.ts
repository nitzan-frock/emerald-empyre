import type { IShape } from './ShapeInterface';

export class CircleShape implements IShape {
  constructor(
    public readonly center: number,
    public readonly primeSize: number,
    public readonly strokeColor: string,
    public readonly strokeWidth: number
  ) { }

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

  private renderCircle(size: number, index: number = 0): string {
    const fill = 'none';
    const stroke = this.strokeColor;
    const strokeWidth = this.strokeWidth;
    const className = index === 0 ? 'drop-shadow-lg' : '';
    const radius = size / 2;

    return `<circle cx="${this.center}" cy="${this.center}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" class="${className}" />`;
  }

  public renderShapes(count: number, spacing: number, direction: string): string {
    return this.generateSizes(count, spacing, direction)
      .reduce((acc, size, index) => acc + this.renderCircle(size, index), '');
  }

  public renderFills(count: number, spacing: number, direction: string): string {
    // Circles don't have fills in this implementation
    return '';
  }

  public renderPrimeFill(): string {
    // Central focal point for circles
    const radius = this.primeSize / 2;
    return `<circle cx="${this.center}" cy="${this.center}" r="${radius}" fill="${this.strokeColor}" />`;
  }

  public generateMaskSvg(): string {
    const radius = this.primeSize / 2;
    return `<circle cx="${this.center}" cy="${this.center}" r="${radius}" fill="white" />`;
  }

  public getTrianglePoints(centerX: number, centerY: number, size: number): string {
    // Not used for circles, but required by interface
    return '';
  }
}
