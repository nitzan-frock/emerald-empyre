import { ShapeCalculator, type ConcentricDiameters, type ShapeCalculationInput } from './ShapeCalculator';

export class CircleShapeCalculator extends ShapeCalculator {
    protected parentShape?: string;

    constructor(input: ShapeCalculationInput) {
        super(input);
        this.parentShape = input.parentShape;
    }

    /**
     * Calculate the appropriate outer diameter for a circle layer based on its parent's inner diameter
     */
    public calculateOuterDiameter(parentInner: number): number {
        // For circles inside triangles, we need to account for the triangle's geometry
        // A circle inscribed in an equilateral triangle has radius = side_length / (2√3)
        // So diameter = side_length / √3
        // For a triangle with inner diameter D, the side length is D * √3 / 2
        // So the inscribed circle diameter is (D * √3 / 2) / √3 = D / 2
        if (this.parentShape === 'triangle') {
            // For an equilateral triangle, the incircle diameter is exactly half the circumcircle diameter
            // The triangle's inner diameter represents the circumcircle diameter
            // So incircle diameter = parentInner / 2
            const result = parentInner / 2;
            console.log(`🔧 INCIRCLE CALCULATION: parentInner=${parentInner}, incircle diameter=${result}`);
            return result;
        }

        // For other shapes, use the parent's inner diameter as the starting point
        return parentInner;
    }

    /**
     * Calculate all diameters for this circle shape
     */
    public calculateLayerDiameters(): ConcentricDiameters {
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
