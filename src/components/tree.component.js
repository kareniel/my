var html = require('choo/html')
var Component = require('nanocomponent')
var TreeLeaf = require('./tree-leaf.component')

module.exports = Tree

function Tree (parent) {
  if (!(this instanceof Tree)) return new Tree(parent)

  Component.call(this)

  this.parent = parent
  this.open = !parent
  this.subgroups = []
  this._subgroups = null
  this.playlists = []
  this.toggle = this.toggle.bind(this)

  this.children = []
}

Tree.prototype = Object.create(Component.prototype)

Tree.prototype.createElement = function (state, emit) {
  var { name, subgroups, playlists } = state

  this.emit = emit
  this.name = name
  this.playlists = playlists || []

  this._subgroups = subgroups
  this.subgroups = subgroups.map(subgroup => Tree(this))

  return html`
    <div class="playlist-group w-100">
      ${html`
        <div tabindex="0" class="${!this.parent ? 'hidden' : ''} playlist-group-item flex flex-row ph1 pv2 w-100">
          ${paddingBlocks(this.parent)}
          ${toggleIcon.call(this, this.open)}
          <div class="w-100 tl mh1">${this.name}</div>
        </div>`
      }
      <div class="playlist-group-children ${this.open ? '' : 'hidden'}">
        ${this.subgroups.map((group, i) => group.render(this._subgroups[i], emit))}
        ${this.playlists.map(p => html`
          <div tabindex=0 class="playlist-group-item playlist-item flex flex-row pa1 w-100">
            ${paddingBlocks(this.parent, this.parent ? 1 : 0)}
            ${playlistIcon()}
            ${p.name}
          </div>
        `)} 
      </div>
    </div>`

  function paddingBlocks (parent, extra = 0) {
    var n = numberOfParentsRecursive(parent, extra)

    return html`
      <div class="flex flex-row">
        ${Array(n).fill(0).map(x => html`<div class="w1 h1 mh1"></div>`)}
      </div>`
  }

  function toggleIcon (toggled) {
    return html`
      <button class="w1 h1 mr2 bg-none scale" onclick=${e => this.toggle()}>
        ${toggled
          ? html`<svg class="ic-white w1 h1" viewBox="0 0 8 8">
                  <use xlink:href="icons/openiconic.svg#si-open-chevron-bottom"></use>
                </svg>`
          : html`<svg class="ic-white w1 h1" viewBox="0 0 8 8">
                  <use xlink:href="icons/openiconic.svg#si-open-chevron-right"></use>
                </svg>`
        }
      </button>`
  }

  function playlistIcon () {
    return html`
      <div class="playlist-group-icon w1 h1 mh2">
        <svg class="ic-white w1 h1" viewBox="0 0 8 8">
          <use xlink:href="icons/openiconic.svg#si-open-excerpt"></use>
        </svg>
      </div>`
  }
}

Tree.prototype.update = function (state, emit) {
  return state.subgroups !== this._subgroups
}

Tree.prototype.toggle = function () {
  this.open = !this.open
  this.rerender()
}

Tree.prototype.addLeaf = function (playlist) {
  this.playlists.push(playlist)
  this.rerender()
}

function numberOfParentsRecursive (parent = {}, i = 0) {
  return parent.parent
    ? numberOfParentsRecursive(parent.parent, i + 1)
    : i
}
