"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggingDirections = void 0;
// @ts-ignore
let global = (new Function('return this'))();
if ( // check presence of "dommali" (roughly)
(typeof global.dommali !== 'function') ||
    (typeof global.dommali.ready !== 'function'))
    throw new TypeError('module "dommali" is missing');
const $ = global.dommali;
const DOMMaLiProto = Object.getPrototypeOf($());
/**** ValueIsNumber ****/
function ValueIsNumber(Value) {
    return (typeof Value === 'number') || (Value instanceof Number);
}
/**** ValueIsFiniteNumber (pure "isFinite" breaks on objects) ****/
function ValueIsFiniteNumber(Value) {
    return ((typeof Value === 'number') || (Value instanceof Number)) && isFinite(Value.valueOf());
}
/**** ValueIsNumberInRange ****/
function ValueIsNumberInRange(Value, minValue, maxValue, withMin = true, withMax = true) {
    if (!ValueIsNumber(Value) || isNaN(Value)) {
        return false;
    }
    if (ValueIsFiniteNumber(minValue)) { // more robust than "isFinite" alone
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((Value < minValue) || (!withMin && (Value === minValue)) ||
                (Value > maxValue) || (!withMax && (Value === maxValue))) {
                return false;
            }
        }
        else {
            if ((Value < minValue) || (!withMin && (Value === minValue))) {
                return false;
            }
        }
    }
    else {
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((Value > maxValue) || (!withMax && (Value === maxValue))) {
                return false;
            }
        }
    }
    return true;
}
/**** ValueIsOrdinal ****/
function ValueIsOrdinal(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    Value = Value.valueOf();
    return isFinite(Value) && (Math.round(Value) === Value) && (Value >= 0);
}
/**** ValueIsString ****/
function ValueIsString(Value) {
    return (typeof Value === 'string') || (Value instanceof String);
}
/**** ValueIsOneOf ****/
function ValueIsOneOf(Value, ValueList) {
    return (ValueList.indexOf(Value) >= 0);
} // no automatic unboxing of boxed values and vice-versa!
exports.DraggingDirections = ['x', 'y', 'both'];
/**** normalizedDraggingOptions ****/
function normalizedDraggingOptions(Options) {
    let { onlyFrom, neverFrom, initialDirection, minOffsetX, minOffsetY, Easing, Extras, stopPropagation, stopImmediatePropagation } = Options || {};
    if (!ValueIsString(onlyFrom)) {
        onlyFrom = undefined;
    }
    if (!ValueIsString(neverFrom)) {
        neverFrom = undefined;
    }
    if (!ValueIsOneOf(initialDirection, exports.DraggingDirections)) {
        initialDirection = 'both';
    }
    if (!ValueIsOrdinal(minOffsetX)) {
        minOffsetX = undefined;
    }
    if (!ValueIsOrdinal(minOffsetY)) {
        minOffsetY = undefined;
    }
    if (Easing === true) {
        Easing = 0.5;
    }
    if (!ValueIsNumberInRange(Easing, 0, 1, false, false)) {
        Easing = undefined;
    }
    if (stopPropagation !== true) {
        stopPropagation = false;
    }
    if (stopImmediatePropagation !== true) {
        stopImmediatePropagation = false;
    }
    return {
        onlyFrom, neverFrom,
        initialDirection, minOffsetX, minOffsetY,
        Easing, Extras,
        stopPropagation, stopImmediatePropagation
    };
}
/**** handleDraggingOf ****/
async function handleDraggingOf($Draggable, Event, Options) {
    if (Event.button !== 0) {
        return;
    }
    let { onlyFrom, neverFrom, initialDirection, minOffsetX, minOffsetY, Easing, Extras, stopPropagation, stopImmediatePropagation } = Options;
    let EventTarget = Event.target;
    if ((onlyFrom != null) && !EventTarget.matches(onlyFrom)) {
        return;
    }
    if ((neverFrom != null) && EventTarget.matches(neverFrom)) {
        return;
    }
    let StartX = Event.pageX, DraggingStarted = false;
    let StartY = Event.pageY;
    let lastTime = Event.timeStamp;
    let vx = 0, vy = 0;
    let PointerId = Event.pointerId;
    EventTarget.setPointerCapture(PointerId);
    if ((minOffsetX == null) && (minOffsetY == null) &&
        (initialDirection === 'both')) {
        $Draggable.trigger('dragging-started', [Extras, Event.pageX, Event.pageY, StartX, StartY, Event]);
        DraggingStarted = true;
        if (stopPropagation == true) {
            Event.stopPropagation();
        }
        if (stopImmediatePropagation == true) {
            Event.stopImmediatePropagation();
        }
    }
    await $Draggable.repeatUntil('pointerup', 'pointercancel', async () => {
        Event = await $Draggable.waitFor('pointermove', 'pointerup', 'pointercancel');
        if (DraggingStarted) {
            if (stopPropagation == true) {
                Event.stopPropagation();
            }
            if (stopImmediatePropagation == true) {
                Event.stopImmediatePropagation();
            }
        }
        switch (true) {
            case (Event.type === 'pointerup') && DraggingStarted:
                let curX = Event.pageX, curY = Event.pageY;
                if ((Easing != null) && (vx != 0) && (vy != 0)) {
                    do {
                        await $Draggable.waitFor(100);
                        vx = Math.trunc(vx * Easing);
                        curX += vx;
                        vy = Math.trunc(vy * Easing);
                        curY += vy;
                        $Draggable.trigger('dragging-continued', [Extras, curX, curY, Event]);
                    } while ((vx != 0) && (vy != 0));
                }
                $Draggable.trigger('dragging-finished', [Extras, curX, curY, Event]);
                break;
            case (Event.type === 'pointercancel') && DraggingStarted:
                $Draggable.trigger('dragging-aborted', [Extras, StartX, StartY, Event]);
                break;
            default:
                if (DraggingStarted) {
                    if ((Easing != null) && (Event.timeStamp !== lastTime)) {
                        vx = Math.trunc(100 * Event.movementX / (Event.timeStamp - lastTime));
                        vy = Math.trunc(100 * Event.movementY / (Event.timeStamp - lastTime));
                    }
                    $Draggable.trigger('dragging-continued', [Extras, Event.pageX, Event.pageY, Event]);
                }
                else {
                    if ((minOffsetX == null) || (Math.abs(Event.pageX - StartX) > minOffsetX) ||
                        (minOffsetY == null) || (Math.abs(Event.pageY - StartY) > minOffsetY)) {
                        let absOffsetX = Math.abs(Event.pageX - StartX);
                        let absOffsetY = Math.abs(Event.pageY - StartY);
                        if ((initialDirection === 'both') ||
                            (initialDirection === 'x') && (absOffsetX > absOffsetY) ||
                            (initialDirection === 'y') && (absOffsetX < absOffsetY)) {
                            $Draggable.trigger('dragging-started', [Extras, Event.pageX, Event.pageY, StartX, StartY, Event]);
                            DraggingStarted = true;
                            if (stopPropagation == true) {
                                Event.stopPropagation();
                            }
                            if (stopImmediatePropagation == true) {
                                Event.stopImmediatePropagation();
                            }
                        }
                    }
                }
        }
    });
    EventTarget.releasePointerCapture(PointerId);
}
Object.assign(DOMMaLiProto, {
    /**** reportsDragging ****/
    reportsDragging: function () {
        return this.recognizesDraggingFor('@this');
    },
    /**** reportsDraggingFor ****/
    reportsDraggingFor: function (Selector) {
        if ((Selector === '@this') || (Selector.trim() === '')) {
            Selector = '@this';
        }
        return ((this.Subjects.length > 0) &&
            this.Subjects.every((Subject) => ((Subject['_dommali_Dragging'] != null) &&
                (typeof Subject['_dommali_Dragging'][Selector] === 'function'))));
    },
    /**** reportDragging ****/
    reportDragging: function (Options) {
        return this.reportDraggingFor('@this', Options);
    },
    /**** reportDraggingFor ****/
    reportDraggingFor: function (Selector, Options) {
        if ((Selector === '@this') || (Selector.trim() === '')) {
            Selector = '@this';
        }
        Options = normalizedDraggingOptions(Options);
        this.ignoreDraggingFor(Selector); // never enable any dragging twice
        this.forEach(($Element) => {
            function Handler(Event) {
                if (Selector === '@this') {
                    handleDraggingOf($Element, Event, Options);
                }
                else {
                    let Candidate = Event.target.closest(Selector);
                    if (Candidate != null) {
                        handleDraggingOf($(Candidate), Event, Options);
                    }
                }
            }
            $Element.on('pointerdown', Handler);
            $Element.prop('_dommali_Dragging', Handler);
        });
        return this;
    },
    /**** ignoreDragging ****/
    ignoreDragging: function () {
        return this.ignoreDraggingFor('@this');
    },
    /**** ignoreDraggingFor ****/
    ignoreDraggingFor: function (Selector) {
        if ((Selector === '@this') || (Selector.trim() === '')) {
            Selector = '@this';
        }
        this.forEach(($Element) => {
            let HandlerSet = $Element.prop('_dommali_Dragging');
            if ((HandlerSet != null) && (typeof HandlerSet[Selector] === 'function')) {
                $Element.off('pointerdown', HandlerSet[Selector]);
                $Element.removeProp('_dommali_Dragging');
            }
        });
    }
});
/**** normalizedSimpleDraggingOptions ****/
function normalizedSimpleDraggingOptions(Options) {
    let { leftLimit, topLimit, rightLimit, bottomLimit, stopPropagation, stopImmediatePropagation } = Options || {};
    if (!ValueIsFiniteNumber(leftLimit)) {
        leftLimit = 0;
    }
    if (!ValueIsFiniteNumber(topLimit)) {
        topLimit = 0;
    }
    if (!ValueIsFiniteNumber(rightLimit)) {
        rightLimit = 0;
    }
    if (!ValueIsFiniteNumber(bottomLimit)) {
        bottomLimit = 0;
    }
    if (stopPropagation !== true) {
        stopPropagation = false;
    }
    if (stopImmediatePropagation !== true) {
        stopImmediatePropagation = false;
    }
    return {
        leftLimit, topLimit, rightLimit, bottomLimit,
        stopPropagation, stopImmediatePropagation
    };
}
Object.assign(DOMMaLiProto, {
    /**** provideSimpleDragging ****/
    provideSimpleDragging: function (Options) {
        this.provideSimpleDraggingFor('@this');
    },
    /**** provideSimpleDraggingFor ****/
    provideSimpleDraggingFor: function (Selector, Options) {
        if ((Selector === '@this') || (Selector.trim() === '')) {
            Selector = '@this';
        }
        if (!this.reportsDraggingFor(Selector)) {
            this.reportDraggingFor(Selector, Options);
        }
        let { leftLimit, topLimit, rightLimit, bottomLimit, stopPropagation, stopImmediatePropagation } = normalizedSimpleDraggingOptions(Options);
        this.on('dragging-started', Selector, async function (Event, Extras, curX, curY, StartX, StartY) {
            if (stopPropagation == true) {
                Event.stopPropagation();
            }
            if (stopImmediatePropagation == true) {
                Event.stopImmediatePropagation();
            }
            let $Draggable = $(Event.target);
            let $Container = $Draggable.parent();
            let initialPosition = $Draggable.positionInParent();
            let OffsetX = initialPosition.left - StartX;
            let OffsetY = initialPosition.top - StartY;
            Event = await this.repeatUntil('dragging-finished', 'dragging-aborted', async () => {
                let x = Math.max(leftLimit, Math.min(curX + OffsetX, $Container.width() - rightLimit));
                let y = Math.max(topLimit, Math.min(curY + OffsetY, $Container.height() - bottomLimit));
                $Draggable.css({ left: x + 'px', top: y + 'px' });
                Event = await this.waitFor('dragging-continued', 'dragging-finished', 'dragging-aborted');
                if (Event.type !== 'dragging-aborted') {
                    [Extras, curX, curY] = $.extraParametersOfEvent(Event);
                }
                if (stopPropagation == true) {
                    Event.stopPropagation();
                }
                if (stopImmediatePropagation == true) {
                    Event.stopImmediatePropagation();
                }
            });
            if (Event.type === 'dragging-aborted') {
                $Draggable.css({ left: initialPosition.left + 'px', top: initialPosition.top + 'px' });
            }
        });
    }
});
