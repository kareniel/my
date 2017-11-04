const html = require('choo/html')

const tabs = [
  { name: 'Tracks', route: '/tracks' },
  { name: 'Artists', route: '/artists' },
  { name: 'Labels', route: '/labels' },
  { name: 'Tags', route: '/tags' }
]

var active = 'bg-white black-80 cursor-default'

module.exports = function tabsbar (state, emit) {
  var isActive = tab => tab.route === state.route ? active : ''
  return html`
    <nav id="tabsbar" class="h2 flex justify-center">
      <div class="flex flex-auto"></div>
      <div class="flex justify-between">
        ${tabs.map((tab, i) => html`
          <a class="flex1 w4 tc mh1" href=${tab.route}>
            <div class="f6 fw5 w-100 b--white bw1 bt bl br br1 pv2 ${isActive(tab)}">
              ${tab.name}
            </div>
          </a>
        `)}
      </div>
      <div id="history-dropdown" class="tr pr3 flex-auto">
      
      </div>
    </nav>
  `
}
