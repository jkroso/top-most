
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
	if (fn) cell.on('change', fn)
	cell.change()
	return cell
}

function TopCell(els){
	this.els = els
	viewport.on('resize', this.change, this)
	viewport.on('scroll', this.change, this)
}

/**
 * mixin emitter
 */

Emitter(TopCell.prototype)

/**
 * how many pixels must be shown before
 * a node is considered "on-screen"
 * 
 * @type {Number}
 * @api private
 */

TopCell.prototype.buf = 0

/**
 * get/set the Cells buffer
 * @param {Number} [n]
 * @return {this|Number}
 */

TopCell.prototype.buffer = function(n){
	if (typeof n != 'number') return this.buf
	this.buf = n
	return this
}

/**
 * check if the top most node has changed. If it has a
 * "change" event will be emitted.
 */

TopCell.prototype.change = function(){
	var els = this.els
	for (var i = 0, len = els.length - 1; i < len; i++) {
		if (bottom(els[i]) > this.buf) break
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
	viewport.off('resize', this.change, this)
	viewport.off('scroll', this.change, this)
}

function bottom(node){
	return node.getBoundingClientRect().bottom
}