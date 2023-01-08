/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**** validate presence of "DOMMaLi" ****/
// @ts-ignore "global" is needed during runtime
var global = (new Function('return this'))();
if ( // check presence of "dommali" (roughly)
(typeof global.dommali !== 'function') ||
    (typeof global.dommali.ready !== 'function'))
    throw new TypeError('module "dommali" is missing');
var $ = global.dommali;
var DOMMaLiProto = Object.getPrototypeOf($());
/**** ValueIsNumber ****/
function ValueIsNumber(Value) {
    return (typeof Value === 'number') || (Value instanceof Number);
}
/**** ValueIsFiniteNumber (pure "isFinite" breaks on objects) ****/
function ValueIsFiniteNumber(Value) {
    return ((typeof Value === 'number') || (Value instanceof Number)) && isFinite(Value.valueOf());
}
/**** ValueIsNumberInRange ****/
function ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax) {
    if (withMin === void 0) { withMin = true; }
    if (withMax === void 0) { withMax = true; }
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
/**** ValueIsString ****/
function ValueIsString(Value) {
    return (typeof Value === 'string') || (Value instanceof String);
}
/**** ValueIsOneOf ****/
function ValueIsOneOf(Value, ValueList) {
    return (ValueList.indexOf(Value) >= 0);
} // no automatic unboxing of boxed values and vice-versa!
var DraggingDirections = ['x', 'y', 'both'];
/**** normalizedDraggingOptions ****/
function normalizedDraggingOptions(Options) {
    var _a = Options || {}, onlyFrom = _a.onlyFrom, neverFrom = _a.neverFrom, initialDirection = _a.initialDirection, minOffsetX = _a.minOffsetX, minOffsetY = _a.minOffsetY, Easing = _a.Easing, Extras = _a.Extras, stopPropagation = _a.stopPropagation, stopImmediatePropagation = _a.stopImmediatePropagation;
    if (!ValueIsString(onlyFrom)) {
        onlyFrom = undefined;
    }
    if (!ValueIsString(neverFrom)) {
        neverFrom = undefined;
    }
    if (!ValueIsOneOf(initialDirection, DraggingDirections)) {
        initialDirection = 'both';
    }
    if (!ValueIsNumberInRange(minOffsetX, 0, Infinity, false)) {
        minOffsetX = undefined;
    }
    if (!ValueIsNumberInRange(minOffsetY, 0, Infinity, false)) {
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
        onlyFrom: onlyFrom,
        neverFrom: neverFrom,
        initialDirection: initialDirection,
        minOffsetX: minOffsetX,
        minOffsetY: minOffsetY,
        Easing: Easing,
        Extras: Extras,
        stopPropagation: stopPropagation,
        stopImmediatePropagation: stopImmediatePropagation
    };
}
/**** handleDraggingOf ****/
function handleDraggingOf($Draggable, Event, Options) {
    return __awaiter(this, void 0, void 0, function () {
        var onlyFrom, neverFrom, initialDirection, minOffsetX, minOffsetY, Easing, Extras, stopPropagation, stopImmediatePropagation, EventTarget, StartX, DraggingStarted, StartY, lastTime, vx, vy, PointerId, _a, curX, curY, absOffsetX, absOffsetY;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (Event.button !== 0) {
                        return [2 /*return*/];
                    }
                    onlyFrom = Options.onlyFrom, neverFrom = Options.neverFrom, initialDirection = Options.initialDirection, minOffsetX = Options.minOffsetX, minOffsetY = Options.minOffsetY, Easing = Options.Easing, Extras = Options.Extras, stopPropagation = Options.stopPropagation, stopImmediatePropagation = Options.stopImmediatePropagation;
                    EventTarget = Event.target;
                    if ((onlyFrom != null) && !EventTarget.matches(onlyFrom)) {
                        return [2 /*return*/];
                    }
                    if ((neverFrom != null) && EventTarget.matches(neverFrom)) {
                        return [2 /*return*/];
                    }
                    StartX = Event.pageX, DraggingStarted = false;
                    StartY = Event.pageY;
                    lastTime = Event.timeStamp;
                    vx = 0, vy = 0;
                    PointerId = Event.pointerId;
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
                    _b.label = 1;
                case 1: return [4 /*yield*/, $Draggable.waitFor('pointermove', 'pointerup', 'pointercancel')];
                case 2:
                    Event = _b.sent();
                    if (Event.pointerId !== PointerId) {
                        return [3 /*break*/, 11];
                    }
                    if (DraggingStarted) {
                        if (stopPropagation == true) {
                            Event.stopPropagation();
                        }
                        if (stopImmediatePropagation == true) {
                            Event.stopImmediatePropagation();
                        }
                    }
                    _a = true;
                    switch (_a) {
                        case (Event.type === 'pointerup') && DraggingStarted: return [3 /*break*/, 3];
                        case (Event.type === 'pointercancel') && DraggingStarted: return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 3:
                    curX = Event.pageX, curY = Event.pageY;
                    if (!((Easing != null) && (vx != 0) && (vy != 0))) return [3 /*break*/, 7];
                    _b.label = 4;
                case 4: return [4 /*yield*/, $Draggable.waitFor(100)];
                case 5:
                    _b.sent();
                    vx = Math.trunc(vx * Easing);
                    curX += vx;
                    vy = Math.trunc(vy * Easing);
                    curY += vy;
                    $Draggable.trigger('dragging-continued', [Extras, curX, curY, Event]);
                    _b.label = 6;
                case 6:
                    if ((vx != 0) && (vy != 0)) return [3 /*break*/, 4];
                    _b.label = 7;
                case 7:
                    $Draggable.trigger('dragging-finished', [Extras, curX, curY, Event]);
                    return [3 /*break*/, 10];
                case 8:
                    $Draggable.trigger('dragging-aborted', [Extras, StartX, StartY, Event]);
                    return [3 /*break*/, 10];
                case 9:
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
                            absOffsetX = Math.abs(Event.pageX - StartX);
                            absOffsetY = Math.abs(Event.pageY - StartY);
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
                    _b.label = 10;
                case 10:
                    if ((Event.type === 'pointerup') || (Event.type === 'pointercancel')) {
                        return [3 /*break*/, 12];
                    }
                    _b.label = 11;
                case 11: return [3 /*break*/, 1];
                case 12:
                    EventTarget.releasePointerCapture(PointerId);
                    return [2 /*return*/];
            }
        });
    });
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
            this.Subjects.every(function (Subject) { return ((Subject['_dommali_Dragging'] != null) &&
                (typeof Subject['_dommali_Dragging'][Selector] === 'function')); }));
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
        this.forEach(function ($Element) {
            function Handler(Event) {
                if (Selector === '@this') {
                    handleDraggingOf($Element, Event, Options);
                }
                else {
                    var Candidate = Event.target.closest(Selector);
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
        this.forEach(function ($Element) {
            var HandlerSet = $Element.prop('_dommali_Dragging');
            if ((HandlerSet != null) && (typeof HandlerSet[Selector] === 'function')) {
                $Element.off('pointerdown', HandlerSet[Selector]);
                $Element.removeProp('_dommali_Dragging');
            }
        });
    }
});
/**** normalizedSimpleDraggingOptions ****/
function normalizedSimpleDraggingOptions(Options) {
    var _a = Options || {}, leftLimit = _a.leftLimit, topLimit = _a.topLimit, rightLimit = _a.rightLimit, bottomLimit = _a.bottomLimit, stopPropagation = _a.stopPropagation, stopImmediatePropagation = _a.stopImmediatePropagation;
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
        leftLimit: leftLimit,
        topLimit: topLimit,
        rightLimit: rightLimit,
        bottomLimit: bottomLimit,
        stopPropagation: stopPropagation,
        stopImmediatePropagation: stopImmediatePropagation
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
        var _a = normalizedSimpleDraggingOptions(Options), leftLimit = _a.leftLimit, topLimit = _a.topLimit, rightLimit = _a.rightLimit, bottomLimit = _a.bottomLimit, stopPropagation = _a.stopPropagation, stopImmediatePropagation = _a.stopImmediatePropagation;
        // @ts-ignore "this" shall(!) be shadowed
        this.on('dragging-started', Selector, function (Event, Extras, curX, curY, StartX, StartY) {
            return __awaiter(this, void 0, void 0, function () {
                var $Draggable, $Container, initialPosition, OffsetX, OffsetY;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (stopPropagation == true) {
                                Event.stopPropagation();
                            }
                            if (stopImmediatePropagation == true) {
                                Event.stopImmediatePropagation();
                            }
                            $Draggable = $(Event.target);
                            $Container = $Draggable.parent();
                            initialPosition = $Draggable.positionInParent();
                            OffsetX = initialPosition.left - StartX;
                            OffsetY = initialPosition.top - StartY;
                            return [4 /*yield*/, this.repeatUntil('dragging-finished', 'dragging-aborted', function () { return __awaiter(_this, void 0, void 0, function () {
                                    var x, y;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                x = Math.max(leftLimit, Math.min(curX + OffsetX, $Container.width() - rightLimit));
                                                y = Math.max(topLimit, Math.min(curY + OffsetY, $Container.height() - bottomLimit));
                                                $Draggable.css({ left: x + 'px', top: y + 'px' });
                                                return [4 /*yield*/, this.waitFor('dragging-continued', 'dragging-finished', 'dragging-aborted')];
                                            case 1:
                                                Event = _b.sent();
                                                if (Event.type !== 'dragging-aborted') {
                                                    _a = $.extraParametersOfEvent(Event), _a[0], curX = _a[1], curY = _a[2];
                                                }
                                                if (stopPropagation == true) {
                                                    Event.stopPropagation();
                                                }
                                                if (stopImmediatePropagation == true) {
                                                    Event.stopImmediatePropagation();
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            Event = _a.sent();
                            if (Event.type === 'dragging-aborted') {
                                $Draggable.css({ left: initialPosition.left + 'px', top: initialPosition.top + 'px' });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    }
});

export { DraggingDirections };
//# sourceMappingURL=dommali-utils.esm.js.map
