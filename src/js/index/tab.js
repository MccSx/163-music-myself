{
  let view = {
    el: '.globalTabs',
    init() {
      this.$el = $(this.el)
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.bindEvents()
    },
    bindEvents() {
      this.view.$el.on('click', 'li', (e) => {
        let pageName = $(e.currentTarget).attr('data-sign')
        $(e.currentTarget).addClass('active').siblings('.active').removeClass('active')
        // this.view.$el.find('.'+pageName).addClass('active').siblings('.active').removeClass('active')
        window.eventHub.trigger('tabSwitch', pageName)
      })
    }
  }
  controller.init(view, model)
}