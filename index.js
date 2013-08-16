
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
 * check if the top most node has changed. If it has a
 * "change" event will be emitted.
 *
 * @api private
 */

TopCell.prototype.change = function(){
	var els = this.els
	for (var i = 0, len = els.length - 1; i < len; i++) {
		if (bottom(els[i]) > 0) break
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