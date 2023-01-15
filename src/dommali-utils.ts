  declare type DOMMaLi = any

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

  type indexableFunction    = Function    & Indexable
  type indexableElement     = Element     & Indexable
  type indexableHTMLElement = HTMLElement & Indexable
  type indexableEvent       = Event       & Indexable

/**** validate presence of "DOMMaLi" ****/

// @ts-ignore "global" is needed during runtime
  let global = (new Function('return this'))()
  if (                                  // check presence of "dommali" (roughly)
    (typeof global.dommali       !== 'function') ||
    (typeof global.dommali.ready !== 'function')
  ) throw new TypeError('module "dommali" is missing')

  const $ = global.dommali
  const DOMMaLiProto = Object.getPrototypeOf($())

/**** ValueIsNumber ****/

  function ValueIsNumber (Value:any):boolean {
    return (typeof Value === 'number') || (Value instanceof Number)
  }

/**** ValueIsFiniteNumber (pure "isFinite" breaks on objects) ****/

  function ValueIsFiniteNumber (Value:any):boolean {
    return (
      (typeof Value === 'number') || (Value instanceof Number)
    ) && isFinite(Value.valueOf())
  }

/**** ValueIsNumberInRange ****/

  function ValueIsNumberInRange (
    Value:any, minValue?:number, maxValue?:number,
    withMin:boolean = true, withMax:boolean = true
  ):boolean {
    if (! ValueIsNumber(Value) || isNaN(Value)) { return false }

    if (ValueIsFiniteNumber(minValue)) {    // more robust than "isFinite" alone
      if (ValueIsFiniteNumber(maxValue)) {  // more robust than "isFinite" alone
        if (
          (Value < (minValue as Number)) || (! withMin && (Value === minValue)) ||
          (Value > (maxValue as Number)) || (! withMax && (Value === maxValue))
        ) {
          return false
        }
      } else {
        if ((Value < (minValue as Number)) || (! withMin && (Value === minValue))) {
          return false
        }
      }
    } else {
      if (ValueIsFiniteNumber(maxValue)) {  // more robust than "isFinite" alone
        if ((Value > (maxValue as Number)) || (! withMax && (Value === maxValue))) {
          return false
        }
      }
    }

    return true
  }

/**** ValueIsOrdinal ****/

  function ValueIsOrdinal (Value:any):boolean {
    if ((typeof Value !== 'number') && ! (Value instanceof Number)) {
      return false
    }

    Value = Value.valueOf()
    return isFinite(Value) && (Math.round(Value) === Value) && (Value >= 0)
  }

/**** ValueIsString ****/

  function ValueIsString (Value:any):boolean {
    return (typeof Value === 'string') || (Value instanceof String)
  }

/**** ValueIsOneOf ****/

  function ValueIsOneOf (Value:any, ValueList:any[]):boolean {
    return (ValueList.indexOf(Value) >= 0)
  }                     // no automatic unboxing of boxed values and vice-versa!

  export type ClickOptions = {
    onlyFrom?:string, neverFrom?:string,
    maxOffsetX?:number, maxOffsetY?:number,
    stopPropagation?:boolean, stopImmediatePropagation?:boolean,
    Extras?:any
  }

/**** normalizedClickOptions ****/

  function normalizedClickOptions (Options?:ClickOptions):ClickOptions {
    let {
      onlyFrom, neverFrom,
      maxOffsetX, maxOffsetY,
      Extras,
      stopPropagation, stopImmediatePropagation
    } = Options || {}
      if (! ValueIsString(onlyFrom))   { onlyFrom  = undefined }
      if (! ValueIsString(neverFrom))  { neverFrom = undefined }

      if (! ValueIsNumberInRange(maxOffsetX, 0,Infinity, false)) { maxOffsetX = undefined }
      if (! ValueIsNumberInRange(maxOffsetY, 0,Infinity, false)) { maxOffsetY = undefined }

      if (stopPropagation          !== true) { stopPropagation          = false }
      if (stopImmediatePropagation !== true) { stopImmediatePropagation = false }
    return {
      onlyFrom, neverFrom,
      maxOffsetX, maxOffsetY,
      Extras,
      stopPropagation, stopImmediatePropagation
    }
  }

/**** handleClickOf ****/

  async function handleClickOf (
    $Clickable:DOMMaLi, Event:PointerEvent, Options:ClickOptions
  ):Promise<void> {
    if (Event.button !== 0) { return }

    let {
      onlyFrom, neverFrom,
      maxOffsetX, maxOffsetY,
      Extras,
      stopPropagation, stopImmediatePropagation
    } = Options

    let EventTarget = Event.target as Element

    if ((onlyFrom  != null) && ! EventTarget.matches(onlyFrom))  { return }
    if ((neverFrom != null) &&   EventTarget.matches(neverFrom)) { return }

    let StartX = Event.pageX, DraggingStarted = false
    let StartY = Event.pageY

    let PointerId = Event.pointerId
    EventTarget.setPointerCapture(PointerId)
      for (;;) {
        Event = await $Clickable.waitFor('pointerdown','pointermove','pointerup','pointercancel')
        if (Event.pointerId !== PointerId) {// important for multi-touch devices
          break
        }

        switch (true) {
          case (Event.type === 'pointerup'):
            if (stopPropagation          == true) { Event.stopPropagation() }
            if (stopImmediatePropagation == true) { Event.stopImmediatePropagation() }

            $Clickable.trigger('clicked',[Extras, Event])
            break
          case (Event.type === 'pointermove'):
            if (
              (maxOffsetX == null) || (Math.abs(Event.pageX-StartX) > maxOffsetX) ||
              (maxOffsetY == null) || (Math.abs(Event.pageY-StartY) > maxOffsetY)
            ) {
              DraggingStarted = true
            }
            break
        }
        if ((Event.type !== 'pointermove') || (DraggingStarted === true)) { break }
      }
//  EventTarget.releasePointerCapture(PointerId) // will be released anyway
  }

  Object.assign(DOMMaLiProto,{
  /**** recognizesClick ****/

    recognizesClick: function (this:DOMMaLi):boolean {
      return this.recognizesClickFor('@this')
    },

  /**** recognizesClickFor ****/

    recognizesClickFor: function (this:DOMMaLi, Selector:string):boolean {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      return (
        (this.Subjects.length > 0) &&
        this.Subjects.every((Subject:indexableElement) => (
          (Subject['_dommali_Click'] != null) &&
          (typeof Subject['_dommali_Click'][Selector] === 'function')
        ))
      )
    },

  /**** recognizeClick ****/

    recognizeClick: function (
      this:DOMMaLi, Options?:ClickOptions
    ):DOMMaLi {
      return this.recognizeClickFor('@this',Options)
    },

  /**** recognizeClickFor ****/

    recognizeClickFor: function (
      this:DOMMaLi, Selector:string, Options?:ClickOptions
    ):void {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      Options = normalizedClickOptions(Options)

      this.ignoreClickFor(Selector)         // never enable any recognizer twice

      this.forEach(($Element:DOMMaLi) => {
        function Handler (Event:PointerEvent) {
          if (Selector === '@this') {
            handleClickOf($Element, Event, Options as ClickOptions)
          } else {
            let Candidate = (Event.target as Element).closest(Selector)
            if (Candidate != null) {
              handleClickOf($(Candidate), Event, Options as ClickOptions)
            }
          }
        }

        $Element.on('pointerdown',Handler)
        $Element.prop('_dommali_Click',Handler)
      })

      return this
    },

  /**** ignoreClick ****/

    ignoreClick: function (this:DOMMaLi):DOMMaLi {
      return this.ignoreClickFor('@this')
    },

  /**** ignoreClickFor ****/

    ignoreClickFor: function (this:DOMMaLi, Selector:string):void {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      this.forEach(($Element:DOMMaLi) => {
        let HandlerSet = $Element.prop('_dommali_Click')
        if ((HandlerSet != null) && (typeof HandlerSet[Selector] === 'function')) {
          $Element.off('pointerdown',HandlerSet[Selector])
          $Element.removeProp('_dommali_Click')
        }
      })
    }
  })

  export const DraggingDirections = ['x','y','both']
  export type  DraggingDirection  = typeof DraggingDirections[number]

  export type DraggingOptions = {
    onlyFrom?:string, neverFrom?:string,
    initialDirection?:DraggingDirection,
    minOffsetX?:number, minOffsetY?:number,
    Easing?:number|boolean,
    stopPropagation?:boolean, stopImmediatePropagation?:boolean,
    Extras?:any
  }

/**** normalizedDraggingOptions ****/

  function normalizedDraggingOptions (Options?:DraggingOptions):DraggingOptions {
    let {
      onlyFrom, neverFrom,
      initialDirection, minOffsetX, minOffsetY,
      Easing, Extras,
      stopPropagation, stopImmediatePropagation
    } = Options || {}
      if (! ValueIsString(onlyFrom))   { onlyFrom  = undefined }
      if (! ValueIsString(neverFrom))  { neverFrom = undefined }

      if (! ValueIsOneOf(initialDirection,DraggingDirections)) {
        initialDirection = 'both'
      }

      if (! ValueIsNumberInRange(minOffsetX, 0,Infinity, false)) { minOffsetX = undefined }
      if (! ValueIsNumberInRange(minOffsetY, 0,Infinity, false)) { minOffsetY = undefined }

      if (Easing === true) { Easing = 0.5 }
      if (! ValueIsNumberInRange(Easing, 0,1, false,false)) {
        Easing = undefined
      }

      if (stopPropagation          !== true) { stopPropagation          = false }
      if (stopImmediatePropagation !== true) { stopImmediatePropagation = false }
    return {
      onlyFrom, neverFrom,
      initialDirection, minOffsetX, minOffsetY,
      Easing, Extras,
      stopPropagation, stopImmediatePropagation
    }
  }

/**** handleDraggingOf ****/

  async function handleDraggingOf (
    $Draggable:DOMMaLi, Event:PointerEvent, Options:DraggingOptions
  ):Promise<void> {
    if (Event.button !== 0) { return }

    let {
      onlyFrom, neverFrom,
      initialDirection, minOffsetX, minOffsetY,
      Easing, Extras,
      stopPropagation, stopImmediatePropagation
    } = Options

    let EventTarget = Event.target as Element

    if ((onlyFrom  != null) && ! EventTarget.matches(onlyFrom))  { return }
    if ((neverFrom != null) &&   EventTarget.matches(neverFrom)) { return }

    let StartX = Event.pageX, DraggingStarted = false
    let StartY = Event.pageY

    let lastTime = Event.timeStamp
    let vx = 0, vy = 0

    let PointerId = Event.pointerId
    EventTarget.setPointerCapture(PointerId)
      if (
        (minOffsetX == null) && (minOffsetY == null) &&
        (initialDirection === 'both')
      ) {
        $Draggable.trigger('dragging-started',[Extras, Event.pageX,Event.pageY, StartX,StartY, Event])
        DraggingStarted = true

        if (stopPropagation          == true) { Event.stopPropagation() }
        if (stopImmediatePropagation == true) { Event.stopImmediatePropagation() }
      }

      for (;;) {
        Event = await $Draggable.waitFor('pointerdown','pointermove','pointerup','pointercancel')
        if (Event.pointerId !== PointerId) {// important for multi-touch devices
          if (DraggingStarted) {
            $Draggable.trigger('dragging-aborted',[Extras, StartX,StartY, Event])
          }
          break
        }

        if (DraggingStarted) {
          if (stopPropagation          == true) { Event.stopPropagation() }
          if (stopImmediatePropagation == true) { Event.stopImmediatePropagation() }
        }

        switch (true) {
          case (Event.type === 'pointerup') && DraggingStarted:
            let curX = Event.pageX, curY = Event.pageY
            if ((Easing != null) && (vx != 0) && (vy != 0)) {
              do {
                await $Draggable.waitFor(100)
                  vx = Math.trunc(vx*(Easing as number)); curX += vx
                  vy = Math.trunc(vy*(Easing as number)); curY += vy
                $Draggable.trigger('dragging-continued',[Extras, curX,curY, Event])
              } while ((vx != 0) && (vy != 0))
            }
            $Draggable.trigger('dragging-finished',[Extras, curX,curY, Event])
            break
          case (Event.type === 'pointercancel') && DraggingStarted:
            $Draggable.trigger('dragging-aborted',[Extras, StartX,StartY, Event])
            break
          default:
            if (DraggingStarted) {
              if ((Easing != null) && (Event.timeStamp !== lastTime)) {
                vx = Math.trunc(100*Event.movementX/(Event.timeStamp-lastTime))
                vy = Math.trunc(100*Event.movementY/(Event.timeStamp-lastTime))
              }

              $Draggable.trigger('dragging-continued',[Extras, Event.pageX,Event.pageY, Event])
            } else {
              if (
                (minOffsetX == null) || (Math.abs(Event.pageX-StartX) >= minOffsetX) ||
                (minOffsetY == null) || (Math.abs(Event.pageY-StartY) >= minOffsetY)
              ) {
                let absOffsetX = Math.abs(Event.pageX-StartX)
                let absOffsetY = Math.abs(Event.pageY-StartY)

                if (
                  (initialDirection === 'both') ||
                  (initialDirection === 'x') && (absOffsetX > absOffsetY) ||
                  (initialDirection === 'y') && (absOffsetX < absOffsetY)
                ) {
                  $Draggable.trigger('dragging-started',[Extras, Event.pageX,Event.pageY, StartX,StartY, Event])
                  DraggingStarted = true

                  if (stopPropagation          == true) { Event.stopPropagation() }
                  if (stopImmediatePropagation == true) { Event.stopImmediatePropagation() }
                }
              }
            }
        }
        if ((Event.type === 'pointerup') || (Event.type === 'pointercancel')) { break }
      }
//  EventTarget.releasePointerCapture(PointerId) // will be released anyway
  }

  Object.assign(DOMMaLiProto,{
  /**** recognizesDragging ****/

    recognizesDragging: function (this:DOMMaLi):boolean {
      return this.recognizesDraggingFor('@this')
    },

  /**** recognizesDraggingFor ****/

    recognizesDraggingFor: function (this:DOMMaLi, Selector:string):boolean {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      return (
        (this.Subjects.length > 0) &&
        this.Subjects.every((Subject:indexableElement) => (
          (Subject['_dommali_Dragging'] != null) &&
          (typeof Subject['_dommali_Dragging'][Selector] === 'function')
        ))
      )
    },

  /**** recognizeDragging ****/

    recognizeDragging: function (
      this:DOMMaLi, Options?:DraggingOptions
    ):DOMMaLi {
      return this.recognizeDraggingFor('@this',Options)
    },

  /**** recognizeDraggingFor ****/

    recognizeDraggingFor: function (
      this:DOMMaLi, Selector:string, Options?:DraggingOptions
    ):void {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      Options = normalizedDraggingOptions(Options)

      this.ignoreDraggingFor(Selector)        // never enable any dragging twice

      this.forEach(($Element:DOMMaLi) => {
        function Handler (Event:PointerEvent) {
          if (Selector === '@this') {
            handleDraggingOf($Element, Event, Options as DraggingOptions)
          } else {
            let Candidate = (Event.target as Element).closest(Selector)
            if (Candidate != null) {
              handleDraggingOf($(Candidate), Event, Options as DraggingOptions)
            }
          }
        }

        $Element.on('pointerdown',Handler)
        $Element.prop('_dommali_Dragging',Handler)
      })

      return this
    },

  /**** ignoreDragging ****/

    ignoreDragging: function (this:DOMMaLi):DOMMaLi {
      return this.ignoreDraggingFor('@this')
    },

  /**** ignoreDraggingFor ****/

    ignoreDraggingFor: function (this:DOMMaLi, Selector:string):void {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      this.forEach(($Element:DOMMaLi) => {
        let HandlerSet = $Element.prop('_dommali_Dragging')
        if ((HandlerSet != null) && (typeof HandlerSet[Selector] === 'function')) {
          $Element.off('pointerdown',HandlerSet[Selector])
          $Element.removeProp('_dommali_Dragging')
        }
      })
    }
  })

  export type simpleDraggingOptions = DraggingOptions & {
    leftLimit?:number, topLimit?:number, rightLimit?:number, bottomLimit?:number,
    stopPropagation?:boolean, stopImmediatePropagation?:boolean
  }

/**** normalizedSimpleDraggingOptions ****/

  function normalizedSimpleDraggingOptions (
    Options?:simpleDraggingOptions
  ):simpleDraggingOptions {
    let {
      leftLimit, topLimit, rightLimit, bottomLimit,
      stopPropagation, stopImmediatePropagation
    } = Options || {}
      if (! ValueIsFiniteNumber(leftLimit))   { leftLimit   = 0 }
      if (! ValueIsFiniteNumber(topLimit))    { topLimit    = 0 }
      if (! ValueIsFiniteNumber(rightLimit))  { rightLimit  = 0 }
      if (! ValueIsFiniteNumber(bottomLimit)) { bottomLimit = 0 }

      if (stopPropagation          !== true) { stopPropagation          = false }
      if (stopImmediatePropagation !== true) { stopImmediatePropagation = false }
    return {
      leftLimit, topLimit, rightLimit, bottomLimit,
      stopPropagation, stopImmediatePropagation
    }
  }

  Object.assign(DOMMaLiProto,{
  /**** provideSimpleDragging ****/

    provideSimpleDragging: function (
      this:DOMMaLi, Options?:simpleDraggingOptions
    ):void {
      this.provideSimpleDraggingFor('@this')
    },

  /**** provideSimpleDraggingFor ****/

    provideSimpleDraggingFor: function (
      this:DOMMaLi, Selector:string, Options?:simpleDraggingOptions
    ):void {
      if ((Selector === '@this') || (Selector.trim() === '')) {
        Selector = '@this'
      }

      if (! this.recognizesDraggingFor(Selector)) {
        this.recognizeDraggingFor(Selector,Options)
      }

      let {
        leftLimit, topLimit, rightLimit, bottomLimit,
        stopPropagation, stopImmediatePropagation
      } = normalizedSimpleDraggingOptions(Options)

// @ts-ignore "this" shall(!) be shadowed
      this.on('dragging-started', Selector, async function (
        this:DOMMaLi, Event:Event, Extras:any,
        curX:number,curY:number, StartX:number,StartY:number
      ) {
        if (stopPropagation          == true) { Event.stopPropagation() }
        if (stopImmediatePropagation == true) { Event.stopImmediatePropagation() }

        let $Draggable = $(Event.target)
        let $Container = $Draggable.parent()

        let initialPosition = $Draggable.positionInParent()
        let OffsetX = initialPosition.left-StartX
        let OffsetY = initialPosition.top -StartY

        Event = await this.repeatUntil('dragging-finished','dragging-aborted', async () => {
          let x = Math.max(leftLimit as number,Math.min(curX+OffsetX,$Container.width() -(rightLimit  as number)))
          let y = Math.max(topLimit  as number,Math.min(curY+OffsetY,$Container.height()-(bottomLimit as number)))
          $Draggable.css({ left:x+'px', top:y+'px' })

          Event = await this.waitFor('dragging-continued','dragging-finished','dragging-aborted')
          if (Event.type !== 'dragging-aborted') {
            [Extras,curX,curY] = $.extraParametersOfEvent(Event)
          }

          if (stopPropagation          == true) { Event.stopPropagation() }
          if (stopImmediatePropagation == true) { Event.stopImmediatePropagation() }
        })
        if (Event.type === 'dragging-aborted') {
          $Draggable.css({ left:initialPosition.left+'px', top:initialPosition.top+'px' })
        }
      })
    }
  })

