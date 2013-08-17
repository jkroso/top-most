
# top-most

  respond to the top most visible DOM element changing

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/top-most

then in your app:

```js
var top-most = require('top-most')
```

## API

- [top-most()](#topmostitemsarraynodelistfnfunction)
- [TopCell.change()](#topcellchange)
- [TopCell.destroy()](#topcelldestroy)

### topmost(items:Array|Nodelist, [fn]:Function)

  create a new TopCell. If you pass a function be invoked with the current top-most node and subscribed to future changes. At least ones which arise from the browser resizing or scrolling. Its up to you to notify it of other possible changes such as DOM mutation.

### TopCell.change()

  check if the top most node has changed. If it has a
  "change" event will be emitted. You might want to call this after doing some DOM mutation etc..

### TopCell.destroy()

  clean up

## Running the Examples

Just run `make` and navigate your browser to them.

## Thanks

Inspired by and based on [timoxley/scroll-position](//github.com/timoxley/scroll-position)
