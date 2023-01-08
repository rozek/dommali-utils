# dommali-utils #

various utility functions for DOMMaLi

`dommali-utils` extends the [dommali](https://github.com/rozek/dommali) library by several utility methods which implement various event handling functions, e.g., for element dragging or non-native drag-and-drop.

> Please note, that this module is currently under active development - do not expect a stable release before end of January 2023



## API ##

### Dragging Recognition ###

`reportDragging` and `reportDraggingFor` install event handlers which listen for PointerEvents, recognize dragging gestures and trigger matching `dragging-started`, `dragging-continued`, `dragging-finished` and `dragging-aborted` events. These may then be listened for in order to implement the actual element dragging (see corresponding examples in the Programming Manual).

Dragging recognizers support the following `DraggingOptions` - all of them are optional:

* **`onlyFrom:string`**<br>if given, only PointerEvents originating from an inner element matching the CSS selector `onlyFrom` will be considered, all others will be ignored. `onlyFrom` may be combined with `neverFrom`
* **`neverFrom:string`**<br>if given, PointerEvents originating from an inner element matching the CSS selector `neverFrom` will be ignored. `neverFrom` may be combined with `onlyFrom`
* **`initialDirection:DraggingDirection`**<br>may be set to `x`, `y` or `both`. When set to `x` or `y`, dragging will only be started if the pointer has moved in the given direction at the moment dragging will be recognized (as given by `minOffsetX` and `minOffsetY`) - otherwise dragging will be ignored
* **`minOffsetX:number`**<br>when set to 0, dragging immediately starts with the initial `pointerdown` event. When set to a value > 0, `dragging-started` will be delayed until the pointer has moved at least `minOffsetX` or `minOffsetY` pixels from the point reported by `pointerdown` (whatever comes first)
* **`minOffsetY:number`**<br>when set to 0, dragging immediately starts with the initial `pointerdown` event. When set to a value > 0, `dragging-started` will be delayed until the pointer has moved at least `minOffsetX` or `minOffsetY` pixels from the point reported by `pointerdown` (whatever comes first)
* **`Easing:number|boolean`**<br>when set to a value between 0 and 1 (exclusively), dragged elements are given some "moment of inertia". This means that dragged elements with a velocity > 0 at the moment of a `pointerup` event will continue to move in their last direction (and trigger `dragging-continued` events) until (simulated) "friction" stops them. The extra events will be triggered every 100ms, and from one event to the next the dragged object's velocity (measured in pixels per second) will be multiplied with the given `Easing` factor until it falls below 10px/s. `dragging-finished` will only be triggered after the dragged elements have stopped moving
* **`stopPropagation:boolean`**<br>when set to `true`, further propagation of intercepted PointerEvents will be stopped - otherwise they may "bubble" as usual
* **`stopImmediatePropagation:boolean`**<br>when set to `true`, further handling and propagation of intercepted PointerEvents will be stopped
* **`Extras:any`**<br>is an optional, user-defined value which is passed unmodified along any `dragging-xxx` event and may be used to differentiate between kinds of dragging within the same event handler


#### Own Recognition ####

* **`reportsDragging ():boolean`**<br>
* **`reportDragging (Options?:DraggingOptions):DOMMaLi`**<br>
* **`ignoreDragging ():DOMMaLi`**<br>

#### Delegated Recognition ####

The following methods use delegated event handlers for dragging recognition. They listen for PointerEvents originating from any element matching a given `Selector` and trigger events at the `dommali` objects the methods have been applied to.

* **`reportsDraggingFor (Selector:string):boolean`**<br>
* **`reportDraggingFor (Selector:string, Options?:DraggingOptions):DOMMaLi`**<br>
* **`ignoreDraggingFor (Selector:string):DOMMaLi`**<br>



## Programming Manual ##

### Simple Dragging ###

(example see [JSBin](https://jsbin.com/qomisod))





## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/dommali-utils/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)
