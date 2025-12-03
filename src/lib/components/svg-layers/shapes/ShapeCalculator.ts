export interface ConcentricDiameters {
    outer: number;
    inner: number;
    additional: number[];
    all: number[];
}

export interface ShapeCalculationInput {
    outer: number;
    spacing: number;
    count: number;
    direction: "outward" | "inward" | "both";
    parentShape?: string; // Type of the parent shape for proper sizing calculations
    parentSpacing?: number; // Spacing of the parent shape for proper sizing calculations
}

export abstract class ShapeCalculator {
    protected outer: number;
    protected spacing: number;
    protected count: number;
    protected direction: "outward" | "inward" | "both";
    protected parentSpacing?: number;

    constructor(
        {
            outer,
            spacing,
            count,
            direction,
            parentSpacing
        }: ShapeCalculationInput
    ) {
        this.outer = outer;
        this.spacing = spacing;
        this.count = count;
        this.direction = direction;
        this.parentSpacing = parentSpacing;
    }

    /**
     * Calculate the appropriate outer diameter for this shape based on its parent's inner diameter
     */
    public abstract calculateOuterDiameter(parentInner: number): number;

    /**
     * Calculate all diameters for this shape
     */
    public abstract calculateLayerDiameters(): ConcentricDiameters;

    /**
     * Calculate additional diameters based on direction and count
     */
    protected calculateAdditionalDiameters(inner: number): number[] {
        const additionalDiameters: number[] = [];

        for (let i = 1; i <= this.count; i++) {
            if (this.direction === 'outward' || this.direction === 'both') {
                additionalDiameters.push(this.outer + i * this.spacing);
            }
            if (this.direction === 'inward' || this.direction === 'both') {
                const inwardDiameter = inner - i * this.spacing;

                if (inwardDiameter > 0) {
                    additionalDiameters.push(inwardDiameter);
                }
            }
        }

        return additionalDiameters;
    }
}
