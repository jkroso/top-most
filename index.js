
var setter = require('setter-method')
var viewport = require('viewport')
var Emitter = require('emitter')

/**
 * create a new TopCell
 * 
 * @param {Array|Nodelist} items
 * @param {Function} [fn]
 * @return {TopCell}
 */

module.exports = function(items, fn){
	var cell = new TopCell(items)
	if (fn) cell.on('change', fn).change()
	return cell
}

function TopCell(els){
	this.els = els
	this.change = this.change.bind(this)
	viewport.on('resize', this.change)
	viewport.on('scroll', this.change)
}

/**
 * mixin emitter
 */

Emitter(TopCell.prototype)

/**
 * Add setter method for "buffer". The number of pixels 
 * which must be shown before a node is considered 
 * on screen
 * 
 * @param {Number} [n]
 * @return {this|Number}
 */

setter(TopCell.prototype, 'buffer', 0)

/**
 * check if the top most node has changed. If it has a
 * "change" event will be emitted.
 *
 * @api public
 */

TopCell.prototype.change = function(){
	var els = this.els
	for (var i = 0, len = els.length - 1; i < len; i++) {
		if (bottom(els[i]) > this._buffer) break
	}
	var old = this.value
	var top = els[i]
	if (top !== old) {
		this.value = top
		this.emit('change', top, i)
	}
}

/**
 * clean up
 */

TopCell.prototype.destroy = function(){
	viewport.off('resize', this.change)
	viewport.off('scroll', this.change)
}

function bottom(node){
	return node.getBoundingClientRect().bottom
}