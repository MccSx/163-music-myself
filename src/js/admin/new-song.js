{
  let view = {
    el: '.newSong',
    template: '新建歌曲',
    init() {
      this.$el = $(this.el)
    },
    render(data={}) {
      this.$el.html(this.template)
    },
    isActive() {
      this.$el.addClass('active')
    },
    noActive() {
      this.$el.removeClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.bindEvents()
      this.bindEventHub()
    },
    bindEvents() {
      this.view.$el.on('click', (e) => {
        e.preventDefault()
        this.view.isActive()
        window.eventHub.trigger('selectSong', false)
      })
    },
    bindEventHub() {
      window.eventHub.on('newSongActive', (bol) => {
        if (bol) {
          this.view.isActive()
        } else {
          this.view.noActive()
        }
      })
    }
  }
  controller.init(view, model)
}