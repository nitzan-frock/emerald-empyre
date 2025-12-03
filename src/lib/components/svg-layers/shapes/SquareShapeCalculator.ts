import { ShapeCalculator, type ConcentricDiameters, type ShapeCalculationInput } from './ShapeCalculator';

export class SquareShapeCalculator extends ShapeCalculator {
    /**
     * Calculate the appropriate outer diameter for a square layer based on its parent's inner diameter
     */
    public calculateOuterDiameter(parentInner: number): number {
        // For a square to fit within a circle, its diagonal should equal the circle's diameter
        // So the square's side length should be diameter / √2
        // But we need to return the side length as the "diameter" for the square
        return parentInner / Math.sqrt(2);
    }

    /**
     * Calculate all diameters for this square shape
     */
    public calculateLayerDiameters(): ConcentricDiameters {
        // For squares, the inner should be the side length of the inner concentric square
        // Reduce the square side length by the spacing amount to maintain consistent spacing
        const inner = this.outer - this.spacing;

        const additional = this.calculateAdditionalDiameters(inner);
        const all = [this.outer, inner, ...additional];

        return {
            outer: this.outer,
            inner: inner,
            additional: additional,
            all: all.filter(d => d > 0).sort((a, b) => b - a),
        };
    }
}
