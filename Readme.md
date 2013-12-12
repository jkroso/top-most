
# top-most

  respond to the top most visible DOM element changing

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/top-most

then in your app:

```js
var topmost = require('top-most')
```

## API

### topmost(items, [fn])

  create a new TopCell. If you pass a function be invoked with the current top-most node and subscribed to future changes. At least ones which arise from the browser resizing or scrolling. Its up to you to notify it of other possible changes such as DOM mutation.

### TopCell.buffer(n)

  get/set the Cells buffer. Buffer meaning the number of pixels which must be shown before a node is considered "on-screen"

### TopCell.change()

  check if the top most node has changed. If it has a
  "change" event will be emitted. You might want to call this after doing some DOM mutation etc..

### TopCell.destroy()

  clean up

## Example

```js
topmost(document.getElementsByTagName('section'))
  .buffer(30)
  .on('change', function(el, index){
    console.log('the %dth item is the top-most', index)
  })
  .change()
```

## Running the Example

Just run `make` and navigate your browser to [example.html](example.html).

## Thanks

Inspired by and based on [timoxley/scroll-position](//github.com/timoxley/scroll-position)
