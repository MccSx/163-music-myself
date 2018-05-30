{
  let view = {
    el: '.page-1',
    init() {
      this.$el = $(this.el)
    },
    show() {
      this.$el.addClass('active')
    },
    hide() {
      this.$el.removeClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.bindEventHub()
      this.loadModules1()
      this.loadModules2()
    },
    bindEventHub() {
      window.eventHub.on('tabSwitch', (pageName) => {
        if (pageName === 'page-1') {
          this.view.show()
        } else {
          this.view.hide()
        }
      })
    },
    loadModules1() {
      let scriptTag = document.createElement('script')
      scriptTag.src = './js/index/page-1-1.js'
      // scriptTag.onload = function () {
      //   console.log('page-1')
      // }
      document.body.appendChild(scriptTag)
    },
    loadModules2() {
      let scriptTag = document.createElement('script')
      scriptTag.src = './js/index/page-1-2.js'
      // scriptTag.onload = function () {
      //   console.log('page-2')
      // }
      document.body.appendChild(scriptTag)
    }
  }
  controller.init(view, model)
}