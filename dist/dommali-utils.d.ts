export type ClickOptions = {
    onlyFrom?: string;
    neverFrom?: string;
    maxOffsetX?: number;
    maxOffsetY?: number;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
    Extras?: any;
};
export declare const DraggingDirections: string[];
export type DraggingDirection = typeof DraggingDirections[number];
export type DraggingOptions = {
    onlyFrom?: string;
    neverFrom?: string;
    initialDirection?: DraggingDirection;
    minOffsetX?: number;
    minOffsetY?: number;
    Easing?: number | boolean;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
    Extras?: any;
};
export type simpleDraggingOptions = DraggingOptions & {
    leftLimit?: number;
    topLimit?: number;
    rightLimit?: number;
    bottomLimit?: number;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
};
