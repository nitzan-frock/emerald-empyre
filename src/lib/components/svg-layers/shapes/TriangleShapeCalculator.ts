import { ShapeCalculator, type ConcentricDiameters, type ShapeCalculationInput } from './ShapeCalculator';

export class TriangleShapeCalculator extends ShapeCalculator {
    /**
     * Calculate the appropriate outer diameter for a triangle layer based on its parent's inner diameter
     */
    public calculateOuterDiameter(parentInner: number): number {
        // For an equilateral triangle inscribed in a circle (circumcircle):
        // The parent's inner diameter becomes the circumcircle diameter
        // The triangle vertices will touch this circle
        return parentInner;
    }

    /**
     * Calculate all diameters for this triangle shape
     */
    public calculateLayerDiameters(): ConcentricDiameters {
        // For triangles, the visual edge spacing is different from diameter spacing
        // To achieve the same visual edge spacing as circles, we need to account for
        // the triangle's geometry. For equilateral triangles:
        // Edge spacing = (R1 - R2) * cos(30°) = (R1 - R2) * √3/2
        // So: R2 = R1 - spacing / (√3/2) = R1 - spacing * 2/√3
        // Since diameter = 2 * radius: inner_diameter = outer_diameter - spacing * 4/√3
        const inner = this.outer - this.spacing * (4 / Math.sqrt(3));

        const additional = this.calculateAdditionalDiameters(inner);
        const all = [this.outer, inner, ...additional];

        return {
            outer: this.outer,
            inner: inner,
            additional: additional,
            all: all.filter(d => d > 0).sort((a, b) => b - a),
        };
    }

    /**
     * Override additional diameters calculation to use triangle-specific spacing
     */
    protected calculateAdditionalDiameters(inner: number): number[] {
        const additionalDiameters: number[] = [];
        const triangleSpacing = this.spacing * (4 / Math.sqrt(3)); // Use same geometric spacing

        for (let i = 1; i <= this.count; i++) {
            if (this.direction === 'outward' || this.direction === 'both') {
                additionalDiameters.push(this.outer + i * triangleSpacing);
            }
            if (this.direction === 'inward' || this.direction === 'both') {
                const inwardDiameter = inner - i * triangleSpacing;

                if (inwardDiameter > 0) {
                    additionalDiameters.push(inwardDiameter);
                }
            }
        }

        return additionalDiameters;
    }
}
